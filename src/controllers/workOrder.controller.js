import WorkOrder from "../models/workOrders.model.js";
import Tire from "../models/tire.model.js";
import User from "../models/user.model.js";
import { format } from "date-fns";

export const createOrOpenWorkOrder = async (req, res) => {
  try {
    const { client } = req.body;

    const userId = req.user._id || req.user.id;

    // Buscar si ya hay una orden abierta del mismo usuario
    let workOrder = await WorkOrder.findOne({ isOpen: true, createdBy: userId });

    if (!workOrder) {
      const ultimaOrdenDeTrabajo = await WorkOrder.findOne().sort({ numero: -1 });
      const nuevoNumero = ultimaOrdenDeTrabajo?.numero ? ultimaOrdenDeTrabajo.numero + 1 : 1;

      // Crear nueva orden
      workOrder = await WorkOrder.create({
        numero: nuevoNumero,
        isOpen: true,
        createdBy: userId,
        client: client ,
      });

      console.log("Orden creada con ID:", workOrder._id);

      // Asociar la orden al usuario
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { workOrders: workOrder._id } },
        { new: true }
      );

      console.log("Usuario actualizado:", updatedUser);
    } else {
      if (client && !workOrder.client) {
        workOrder.client = client;
        await workOrder.save();
      }
    }

    res.json({ success: true, workOrder });
  } catch (error) {
    console.error("Error al crear/abrir orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

// export const createOrOpenWorkOrder = async (req, res) => {
//   try {
//     const { client,  } = req.body;

//     // Buscar una orden de trabajo abierta
//     let workOrder = await WorkOrder.findOne({ isOpen: true });

//     if (!workOrder) {
//       // Buscar la última orden de trabajo para calcular el número secuencial
//       const ultimaOrdenDeTrabajo = await WorkOrder.findOne().sort({
//         numero: -1,
//       });

//       let nuevoNumero = 1;
//       if (ultimaOrdenDeTrabajo && ultimaOrdenDeTrabajo.numero) {
//         nuevoNumero = ultimaOrdenDeTrabajo.numero + 1;
//       }

//       // Crear una nueva orden de trabajo
//       workOrder = await WorkOrder.create({
//         numero: nuevoNumero,
//         isOpen: true,
//         createdBy: req.user.id, // Referenciar la orden al usuario
//       });

//       // Agregar la orden de trabajo al usuario
//       await User.findByIdAndUpdate(req.user._id, {
//         $push: { workOrders: workOrder._id },
//       });
//     }

//     // Asociar cliente desde el frontend si no está asociado
//     if (client) {
//       workOrder.client = client;
//       await workOrder.save();
//     }

//     res.json({ success: true, workOrder });
//   } catch (error) {
//     console.error("Error al crear/abrir orden de trabajo:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error interno del servidor" });
//   }
// };

// Este controlador cierra una orden de trabajo
export const closeWorkOrder = async (req, res) => {
  try {
    const { socketId, username } = req.body; // Obtener socketId y nombre de usuario

    if (!socketId || !username) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan datos requeridos." });
    }

    const currentWorkOrder = await WorkOrder.findOne({ isOpen: true }).sort({
      createdAt: -1,
    });

    if (!currentWorkOrder) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No hay ninguna orden de trabajo abierta.",
        });
    }

    // Cerrar la orden de trabajo
    currentWorkOrder.isOpen = false;
    currentWorkOrder.status = "cerrado";
    await currentWorkOrder.save();

    // Obtener instancia de Socket.IO
    const io = req.app.get("io");

    // Enviar notificación a TODOS excepto al usuario que cerró la orden
    io.sockets.sockets.forEach((socket) => {
      if (socket.id !== socketId) {
        socket.emit("newNotification", {
          message: `${username} creo una orden de trabajo.`,
          timestamp: new Date().toLocaleString(),
        });
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Orden cerrada correctamente." });
  } catch (error) {
    console.error("Error al cerrar la orden:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWorkOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la orden de trabajo y "populear" las llantas asociadas
    const workOrder = await WorkOrder.findById(id)
      .populate("tires")
      .populate({
        path: "createdBy", // Poblar el usuario que creó la orden de trabajo
        select: "name lastName _id", // Lista de campos que deseas poblar del usuario
      })
      .populate({ path: "client" });

    if (!workOrder) {
      return res
        .status(404)
        .json({ message: "Orden de trabajo no encontrada" });
    }

    // Convertir a un objeto y formatear la fecha
    const formattedWorkOrder = {
      ...workOrder.toObject(),
      formattedCreatedAt: format(new Date(workOrder.createdAt), "dd/MM/yyyy"), // Ajusta el formato según tus necesidades
    };

    res.json(formattedWorkOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la orden de trabajo", error });
  }
};

export const getWorkOrders = async (req, res) => {
  try {
    // Buscar todas las órdenes de trabajo existentes
    const workOrders = await WorkOrder.find({})
      .populate({
        path: "createdBy",
        select: "name lastName _id",
      })
      .populate({
        path: "client",
      });

    // Formatear la fecha de creación
    const formattedWorkOrders = workOrders.map((order) => ({
      ...order.toObject(),
      // formattedCreatedAt: format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss"),
      formattedCreatedAt: format(new Date(order.createdAt), "dd/MM/yyyy"),
    }));

    res.json(formattedWorkOrders);
  } catch (error) {
    console.error("Error al obtener órdenes de trabajo:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const workOrder = await WorkOrder.findById(id);
    if (!workOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Orden no encontrada" });
    }

    await Tire.deleteMany({ _id: { $in: workOrder.tires } });
    await WorkOrder.findByIdAndDelete(id);

    const io = req.app.get("io");
    if (io) {
      io.emit("workOrderDeleted", { id });
    }

    res
      .status(200)
      .json({ success: true, message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};

// export const getWorkOrdersBySeller = async (req, res) => {
//   try {
//     // const seller = await User.findOne({ role: "Vendedor" });
//   } catch (error) {
    
//   }
// };
