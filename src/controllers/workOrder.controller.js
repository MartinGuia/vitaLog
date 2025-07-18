import WorkOrder from "../models/workOrders.model.js";
import Tire from "../models/tire.model.js";
import User from "../models/user.model.js";
import { format } from "date-fns";

export const createOrOpenWorkOrder = async (req, res) => {
  try {
    const { client } = req.body;
    const userId = req.user._id || req.user.id;

    // Verificar si ya existe una orden abierta del mismo usuario
    const existingOpenOrder = await WorkOrder.findOne({
      isOpen: true,
      createdBy: userId,
    });

    // Si ya hay una orden abierta, no permitir crear otra
    if (existingOpenOrder) {
      return res.status(400).json({
        message: [
          "Ya tienes una orden de trabajo abierta. Debes cerrarla antes de crear una nueva.",
        ],
        workOrder: existingOpenOrder,
      });
    }

    // Obtener el número consecutivo para la nueva orden
    const ultimaOrdenDeTrabajo = await WorkOrder.findOne().sort({ numero: -1 });
    const nuevoNumero = ultimaOrdenDeTrabajo?.numero
      ? ultimaOrdenDeTrabajo.numero + 1
      : 1;

    // Crear la nueva orden
    const newWorkOrder = await WorkOrder.create({
      numero: nuevoNumero,
      isOpen: true,
      createdBy: userId,
      client: client,
    });

    // Asociar la orden al usuario
    await User.findByIdAndUpdate(
      userId,
      { $push: { workOrders: newWorkOrder._id } },
      { new: true }
    );

    res.json({ success: true, workOrder: newWorkOrder });
  } catch (error) {
    console.error("Error al crear/abrir orden de trabajo:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

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
      return res.status(404).json({
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

export const updateWorkOrder = async (req, res) => {
  try {
    const { createdBy, client } = req.body;

    const workOrder = await WorkOrder.findById(req.params.id);
    if (!workOrder) {
      return res
        .status(404)
        .json({ message: "Orden de trabajo no encontrada." });
    }

    // 1. Eliminar la referencia en el usuario anterior
    if (workOrder.createdBy && workOrder.createdBy.toString() !== createdBy) {
      await User.findByIdAndUpdate(workOrder.createdBy, {
        $pull: { workOrders: workOrder._id },
      });
    }

    // 2. Agregar la referencia en el nuevo usuario
    if (createdBy) {
      await User.findByIdAndUpdate(createdBy, {
        $addToSet: { workOrders: workOrder._id },
      });
    }

    // 3. Actualizar los campos en la orden
    workOrder.createdBy = createdBy;
    workOrder.client = client;
    await workOrder.save();

    // 4. Actualizar el campo 'user' de las llantas asociadas a esta orden
    await Tire.updateMany(
      { workOrder: workOrder._id },
      { $set: { user: createdBy } }
    );

    res.status(200).json({
      success: true,
      message: "Orden actualizada correctamente.",
      workOrder,
    });
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
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
      .sort({ createdAt: -1 })
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

    // ❗ Quitar la referencia en el usuario
    if (workOrder.createdBy) {
      await User.findByIdAndUpdate(workOrder.createdBy, {
        $pull: { workOrders: workOrder._id },
      });
    }

    // ❗ Eliminar las llantas relacionadas
    await Tire.deleteMany({ _id: { $in: workOrder.tires } });

    // ❗ Eliminar la orden
    await WorkOrder.findByIdAndDelete(id);

    // ❗ Emitir evento por Socket.io (si aplica)
    const io = req.app.get("io");
    if (io) {
      io.emit("workOrderDeleted", { id });
    }

    res
      .status(200)
      .json({ success: true, message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    res.status(500).json({ success: false, message: ["Error del servidor"] });
  }
};

export const quoteWorkOrder = async (req, res) => {
  try {
    const { workOrdersIds } = req.body; // arreglo de IDs de llantas

    if (!Array.isArray(workOrdersIds) || workOrdersIds.length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron ordenes de trabajo a actualizar.",
      });
    }

    const result = await WorkOrder.updateMany(
      { _id: { $in: workOrdersIds } }, // condición: múltiples IDs
      { $set: { quoteWorkOrder: true } } // actualización
    );

    res.json({ success: true, updatedCount: result.modifiedCount });
  } catch (error) {
    console.error("Error al actualizar quoteWorkOrder:", error);
    res.status(500).json({
      message: "Error al actualizar las ordenes de trabajo para cotización",
      error,
    });
  }
};

export const getQuotedWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find({ quoteWorkOrder: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "tires",
        select: "-user -createdAt -updatedAt -inspection -date",
      })
      .populate({
        path: "client",
        select: "-zipCode -Rfc -clientCode -eMail",
      })
      .populate({
        path: "createdBy",
        select: "name",
      });

    if (!workOrders.length) {
      return res.status(404).json({
        message:
          "No hay órdenes de trabajo marcadas como cotización (quoteWorkOrder: true)",
      });
    }

    const formattedWorkOrders = workOrders.map((order) => ({
      ...order.toObject(),
      formattedCreatedAt: format(new Date(order.createdAt), "dd/MM/yyyy"),
    }));

    return res.status(200).json(formattedWorkOrders);
  } catch (error) {
    console.error("Error al obtener órdenes de trabajo cotizadas:", error);
    return res.status(500).json({
      message: "Error del servidor al recuperar las órdenes de trabajo",
    });
  }
};

export const reopenWorkOrder = async (req, res) => {
  try {
    const { workOrderId } = req.body;

    const order = await WorkOrder.findById(workOrderId);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    if (order.isOpen) {
      return res.status(400).json({ message: "La orden ya está abierta" });
    }

    order.isOpen = true;
    await order.save();

    res.json({ message: "Orden reabierta correctamente", workOrder: order });
  } catch (error) {
    console.error("Error al reabrir la orden:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
