import WorkOrder from "../models/workOrders.model.js";
import Tire from "../models/tire.model.js"
import User from "../models/user.model.js";
import { format } from "date-fns";

export const createOrOpenWorkOrder = async (req, res) => {
  try {
    const { client } = req.body;

    // Buscar una orden de trabajo abierta
    let workOrder = await WorkOrder.findOne({ isOpen: true });

    if (!workOrder) {
      // Buscar la última orden de trabajo para calcular el número secuencial
      const ultimaOrdenDeTrabajo = await WorkOrder.findOne().sort({ numero: -1 });

      let nuevoNumero = 1;
      if (ultimaOrdenDeTrabajo && ultimaOrdenDeTrabajo.numero) {
        nuevoNumero = ultimaOrdenDeTrabajo.numero + 1;
      }

      // Crear una nueva orden de trabajo
      workOrder = await WorkOrder.create({
        numero: nuevoNumero,
        isOpen: true,
        createdBy: req.user.id, // Referenciar la orden al usuario
      });

      // Agregar la orden de trabajo al usuario
      await User.findByIdAndUpdate(req.user._id, {
        $push: { workOrders: workOrder._id },
      });
    }

    // Asociar cliente desde el frontend si no está asociado
    if (client) {
      workOrder.client = client;
      await workOrder.save();
    }

    res.json({ success: true, workOrder });
  } catch (error) {
    console.error("Error al crear/abrir orden de trabajo:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

// Este controlador cierra una orden de trabajo
export const closeWorkOrder = async (req, res) => {
  try {
    // Buscar la orden de trabajo abierta más reciente
    const currentWorkOrder = await WorkOrder.findOne({ isOpen: true })
      .sort({ createdAt: -1 })

    if (!currentWorkOrder) {
      return res.status(404).json({ success: false, message: "No hay ninguna orden de trabajo abierta." });
    }

    // Actualizar la orden de trabajo encontrada a cerrada
    currentWorkOrder.isOpen = false;
    currentWorkOrder.status = "cerrado";
    await currentWorkOrder.save();

    res.status(200).json({ success: true, currentWorkOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const getWorkOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la orden de trabajo y "populear" las llantas asociadas
    const workOrder = await WorkOrder.findById(id).populate('tires').populate({
      path: "createdBy",  // Poblar el usuario que creó la orden de trabajo
      select: "name lastName _id",  // Lista de campos que deseas poblar del usuario
    });
    
    if (!workOrder) {
      return res.status(404).json({ message: "Orden de trabajo no encontrada" });
    }

    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la orden de trabajo", error });
  }
};

export const deleteWorkOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la orden de trabajo por ID
    const workOrder = await WorkOrder.findById(id);

    if (!workOrder) {
      return res.status(404).json({
        success: false,
        message: "Orden de trabajo no encontrada.",
      });
    }

    // Eliminar todas las llantas asociadas a la orden de trabajo
    await Tire.deleteMany({ _id: { $in: workOrder.tires } });

    // Eliminar la orden de trabajo
    await WorkOrder.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Orden de trabajo y llantas asociadas eliminadas exitosamente.",
    });
  } catch (error) {
    console.error("Error al eliminar la orden de trabajo:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
};
