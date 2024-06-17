import WorkOrder from "../models/workOrders.model.js";

// Este controlador cierra una orden de trabajo
export const closeWorkOrder = async (req, res) => {
  try {
    // Buscar la orden de trabajo abierta más reciente
    const currentWorkOrder = await WorkOrder.findOne({ isOpen: true })
      .sort({ createdAt: -1 })
      .exec();

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

// export const getWorkOrder = async (req, res) => {
//   const workOrder = await Tire.findById(req.params.id).populate({
//     path: "user",
//     select: "name lastName _id", // Lista de campos que deseas poblar
//   });
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// };
