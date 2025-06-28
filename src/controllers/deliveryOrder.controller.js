import DeliveryOrder from "../models/deliveryOrder.model.js";
import Tire from "../models/tire.model.js";
import User from "../models/user.model.js";
import { format } from "date-fns";

export const createOrOpenDeliveryOrder = async (req, res) => {
  try {
    const { client } = req.body;

    // Buscar una orden de trabajo abierta
    let deliveryOrder = await DeliveryOrder.findOne({ isOpen: true });

    if (!deliveryOrder) {
      // Buscar la última orden de trabajo para calcular el número secuencial
      const ultimaOrdenDeEntrega = await DeliveryOrder.findOne().sort({
        numero: -1,
      });

      let nuevoNumero = 1;
      if (ultimaOrdenDeEntrega && ultimaOrdenDeEntrega.numero) {
        nuevoNumero = ultimaOrdenDeEntrega.numero + 1;
      }

      // Crear una nueva orden de trabajo
      deliveryOrder = await DeliveryOrder.create({
        numero: nuevoNumero,
        isOpen: true,
        createdBy: req.user.id, // Referenciar la orden al usuario
      });

      // Agregar la orden de trabajo al usuario
      await User.findByIdAndUpdate(req.user._id, {
        $push: { deliveryOrders: deliveryOrder._id },
      });
    }

    // Asociar cliente desde el frontend si no está asociado
    if (client) {
      deliveryOrder.client = client;
      await deliveryOrder.save();
    }

    res.json({ success: true, deliveryOrder });
  } catch (error) {
    console.error("Error al crear/abrir orden de entrega:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

// Este controlador cierra una orden de trabajo
export const closeDeliveryOrder = async (req, res) => {
  try {
    // const { socketId, username } = req.body;

    // if (!socketId || !username) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Faltan datos requeridos." });
    // }

    // Buscar la orden de trabajo abierta más reciente
    const currentDeliveryOrder = await DeliveryOrder.findOne({
      isOpen: true,
    }).sort({ createdAt: -1 });

    if (!currentDeliveryOrder) {
      return res.status(404).json({
        success: false,
        message: "No hay ninguna orden de trabajo abierta.",
      });
    }

    // Actualizar la orden de trabajo encontrada a cerrada
    currentDeliveryOrder.isOpen = false;
    currentDeliveryOrder.status = "cerrado";
    await currentDeliveryOrder.save();

    // // Obtener instancia de Socket.IO
    // const io = req.app.get("io");

    // io.sockets.sockets.forEach((socket) => {
    //   if (socket.id !== socketId) {
    //     socket.emit("newNotification", {
    //       message: `${username} ha creado la orden de entrega #${currentDeliveryOrder.numero}.`,
    //       timestamp: new Date().toLocaleString(),
    //     });
    //   }
    // });

    res.status(200).json({ success: true, currentDeliveryOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTiresToDeliveryOrder = async (req, res) => {
  try {
    const { tires } = req.body;

    // Validar los datos recibidos
    if (!tires) {
      return res
        .status(400)
        .json({ message: "Faltan datos requeridos: tires." });
    }

    // Asegurar que tires sea un arreglo, incluso si es un solo ID
    const tiresArray = Array.isArray(tires) ? tires : [tires];

    // Buscar la orden de entrega abierta
    const deliveryOrder = await DeliveryOrder.findOne({ isOpen: true });

    if (!deliveryOrder) {
      return res.status(404).json({
        message: "No se encontró una orden de entrega abierta.",
      });
    }

    // Verificar que las llantas existen y no están asociadas a otra orden
    const validTires = await Tire.find({
      _id: { $in: tiresArray },
      deliveryOrder: null, // Verificar que no están asociadas a otra orden
    });

    if (validTires.length !== tiresArray.length) {
      return res.status(400).json({
        message:
          "Algunas llantas no existen o ya están asociadas a otra orden.",
      });
    }

    // Agregar las llantas a la orden de entrega
    deliveryOrder.tires.push(...validTires.map((tire) => tire._id)); // Aseguramos que solo se agreguen los IDs

    // Guardar la orden de entrega actualizada
    await deliveryOrder.save();

    await Tire.updateMany(
      { _id: { $in: validTires.map((tire) => tire._id) } },
      { $set: { inDeliveryNote: true, deliveryOrder: deliveryOrder._id } }
    );

    return res.status(200).json({
      message: "Llantas agregadas a la orden de entrega con éxito.",
      deliveryOrder,
    });
  } catch (error) {
    console.error("Error al agregar llantas a la orden de entrega:", error);
    return res.status(500).json({
      message: "Ocurrió un error al agregar las llantas.",
      error: error.message,
    });
  }
};

export const getDeliveryOrders = async (req, res) => {
  try {
    // Buscar todas las órdenes de entrega existentes
    const deliveryOrders = await DeliveryOrder.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: "name lastName _id",
      })
      .populate({
        path: "tires",
      })
      .populate({
        path: "client",
      });

    const formattedDeliveryOrders = deliveryOrders.map((order) => ({
      ...order.toObject(),
      formattedCreatedAT: format(new Date(order.createdAt), "dd/MM/yyyy"),
    }));

    res.json(formattedDeliveryOrders);
  } catch (error) {
    console.error("Error al obtener órdenes de entrega:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const getDeliveryOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    //Buscar la orden de entrega y agregar llantas asociadas
    const deliveryOrder = await DeliveryOrder.findById(id)
      .populate({
        path: "tires",
        populate: {
          path: "workOrder user",
          select: "numero name lastName",
        },
      })
      .populate({ path: "createdBy", select: "name lastName userName" })
      .populate({ path: "client" });

    if (!deliveryOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Orden de entrega no encontrada." });
    }

    // Convertir a un objeto y formatear la fecha
    const formattedDeliveryOrder = {
      ...deliveryOrder.toObject(),
      formattedCreatedAt: format(
        new Date(deliveryOrder.createdAt),
        "dd/MM/yyyy"
      ), // Ajusta el formato según tus necesidades
    };

    res.json(formattedDeliveryOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la orden de entrega", error });
  }
};

// Este controlador elimina una orden de trabajo
export const deleteDeliveryOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deliveryOrder = await DeliveryOrder.findById(id);
    if (!deliveryOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Orden de entrega no encontrada." });
    }

    await DeliveryOrder.findByIdAndDelete(id);

    const io = req.app.get("io");
    if (io) {
      io.emit("deliveryOrderDeleted", { id });
    }

    res.status(200).json({
      success: true,
      message: "Orden de entrega eliminada exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar la orden de entrega:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
