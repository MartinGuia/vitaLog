import WorkOrder from "../models/workOrders.model.js";
import Tire from "../models/tire.model.js"

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
        path: "createdBy",  // Poblar el usuario que creó la orden de trabajo
        select: "name lastName _id",  // Lista de campos que deseas poblar del usuario
      })

    res.json(workOrders);
  } catch (error) {
    console.error("Error al obtener órdenes de trabajo:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const getWorkOrderById = async (req, res) => {
  try {
    const workOrderFound = await WorkOrder.findById(req.params.id)
    // const workOrderTires = workOrderFound.tires;
    // const tiresArray = [];

    // for (const tire of workOrderTires) {
    //   let tiresFound = await Tire.findById
    // }
    .populate({
      path: "createdBy tires",  // Poblar el usuario que creó la orden de trabajo
      select: "name lastName",
       // Lista de campos que deseas poblar del usuario
    })
     if (!workOrderFound) return res.status(404).json({ success: false, message: "workorder not found"})
     res.json(workOrderFound)
  } catch (error) {
    return res.status(500).json({ success: false, message: "workorder not found"})
  }
};
