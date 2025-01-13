import DeliveryOrder from "../models/deliveryOrder.model.js" 
import Tire from "../models/tire.model.js"
import User from "../models/user.model.js";
import { format } from "date-fns";

export const createOrOpenDeliveryOrder = async (req, res) => {
  try {
    const { client } = req.body;

    // Buscar una orden de trabajo abierta
    let deliveryOrder = await DeliveryOrder.findOne({ isOpen: true });

    if (!deliveryOrder) {
      // Buscar la última orden de trabajo para calcular el número secuencial
      const ultimaOrdenDeTrabajo = await DeliveryOrder.findOne().sort({ numero: -1 });

      let nuevoNumero = 1;
      if (ultimaOrdenDeTrabajo && ultimaOrdenDeTrabajo.numero) {
        nuevoNumero = ultimaOrdenDeTrabajo.numero + 1;
      }

      // Crear una nueva orden de trabajo
      deliveryOrder = await DeliveryOrder.create({
        numero: nuevoNumero,
        isOpen: true,
        createdBy: req.user.id, // Referenciar la orden al usuario
      });

      // Agregar la orden de trabajo al usuario
      await User.findByIdAndUpdate(req.user._id, {
        $push: { workOrders: deliveryOrder._id },
      });
    }

    // Asociar cliente desde el frontend si no está asociado
    if (client) {
      deliveryOrder.client = client;
      await deliveryOrder.save();
    }

    res.json({ success: true, deliveryOrder });
  } catch (error) {
    console.error("Error al crear/abrir orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

// Este controlador cierra una orden de trabajo
export const closeDeliveryOrder = async (req, res) => {
  try {
    // Buscar la orden de trabajo abierta más reciente
    const currentDeliveryOrder = await DeliveryOrder.findOne({ isOpen: true })
      .sort({ createdAt: -1 })

    if (!currentDeliveryOrder) {
      return res.status(404).json({ success: false, message: "No hay ninguna orden de trabajo abierta." });
    }

    // Actualizar la orden de trabajo encontrada a cerrada
    currentDeliveryOrder.isOpen = false;
    currentDeliveryOrder.status = "cerrado";
    await currentDeliveryOrder.save();

    res.status(200).json({ success: true, currentDeliveryOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTiresToDeliveryOrder = async (req, res) => {
  try {
    const { tireIds } = req.body; // Recibe un array de IDs de llantas desde el frontend

    // Validar que se hayan enviado IDs de llantas
    if (!tireIds || !Array.isArray(tireIds) || tireIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No se proporcionaron IDs de llantas válidos.",
      });
    }

    // Buscar una orden de entrega abierta
    const deliveryOrder = await DeliveryOrder.findOne({ isOpen: true });

    if (!deliveryOrder) {
      return res.status(404).json({
        success: false,
        message: "No hay ninguna orden de entrega abierta.",
      });
    }

    // Validar que los IDs de llantas existen
    const tires = await Tire.find({ _id: { $in: tireIds } });

    if (tires.length !== tireIds.length) {
      return res.status(400).json({
        success: false,
        message: "Algunos IDs de llantas no son válidos.",
      });
    }

    // Agregar las llantas a la orden de entrega
    deliveryOrder.tires = deliveryOrder.tires || [];
    deliveryOrder.tires.push(...tires.map((tire) => tire._id));

    // Guardar los cambios en la base de datos
    await deliveryOrder.save();

    res.json({
      success: true,
      message: "Llantas agregadas a la orden de entrega abierta.",
      deliveryOrder,
    });
  } catch (error) {
    console.error("Error al agregar llantas a la orden de entrega:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};
// export const addTiresToDeliveryOrder = async (req, res) => {
//   try {
//     const { tireIds } = req.body; // IDs de llantas a asociar

//     if (!tireIds || !Array.isArray(tireIds) || tireIds.length === 0) {
//       return res.status(400).json({ success: false, message: "No tire IDs provided" });
//     }

//     // Buscar una orden de entrega abierta
//     let deliveryOrder = await DeliveryOrder.findOne({ isOpen: true });

//     if (!deliveryOrder) {
//       // Crear una nueva orden si no existe una abierta
//       const lastOrder = await DeliveryOrder.findOne().sort({ numero: -1 });
//       const newOrderNumber = lastOrder && lastOrder.numero ? lastOrder.numero + 1 : 1;

//       deliveryOrder = await DeliveryOrder.create({
//         numero: newOrderNumber,
//         isOpen: true,
//         createdBy: req.user.id,
//       });
//     }

//     // Verificar que las llantas existen
//     const existingTires = await Tire.find({ _id: { $in: tireIds } });
//     if (existingTires.length !== tireIds.length) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Some tire IDs are invalid" });
//     }

//     // Agregar las llantas a la orden, evitando duplicados
//     const currentTires = new Set(deliveryOrder.tires.map((tire) => tire.toString()));
//     const newTires = tireIds.filter((id) => !currentTires.has(id));

//     if (newTires.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All tires are already in the order" });
//     }

//     deliveryOrder.tires.push(...newTires);

//     // Guardar la orden de entrega actualizada
//     await deliveryOrder.save();

//     res.status(200).json({
//       success: true,
//       message: "Tires added successfully",
//       deliveryOrder,
//     });
//   } catch (error) {
//     console.error("Error adding tires to delivery order:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };