import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";

export const getTires = async (req, res) => {
  const tires = await Tire.find({
    user: req.user.id,
  }).populate({
    path: "user",
    select: "name lastName _id", // Lista de campos que deseas poblar
  });
  res.json(tires);
};

export const createTire = async (req, res) => {
  try {
    const {
      itemCode,
      barCode,
      helmetMeasurement,
      brand,
      helmetDesign,
      requiredBand,
      antiquityDot,
      state,
      date,
    } = req.body;

    console.log(req.user);
    // Buscar una orden de trabajo abierta o crear una nueva si no existe
    let workOrder = await WorkOrder.findOne({ isOpen: true })
    if (!workOrder) {
      workOrder = await WorkOrder.create({ isOpen: true, createdBy: req.user.id, });
    }
    
    // Encuentra la última llanta registrada para esta orden de trabajo
    const ultimaLlanta = await Tire.findOne({}).sort({ linea: -1 })

    let nuevaLinea = 1;

    if (ultimaLlanta) {
      nuevaLinea = ultimaLlanta.linea + 1;
    }

    const newTire = new Tire({
      linea: nuevaLinea,
      itemCode,
      barCode,
      helmetMeasurement,
      brand,
      helmetDesign,
      requiredBand,
      antiquityDot,
      state,
      date,
      user: req.user.id,
    });

    const savedTire = await newTire.save();
    
    workOrder.tires.push(savedTire);
    await workOrder.save();
    res.json(savedTire);
  } catch (error) {
    console.error("Error al crear llantas:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const getTire = async (req, res) => {
  const task = await Tire.findById(req.params.id).populate({
    path: "user",
    // select: "name lastName _id", // Lista de campos que deseas poblar
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const deleteTire = async (req, res) => {
  const task = await Tire.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
};

export const updateTire = async (req, res) => {
  const task = await Tire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};
