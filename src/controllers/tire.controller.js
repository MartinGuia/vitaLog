import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";
import User from "../models/user.model.js";
import Client from "../models/client.model.js";

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

    // Buscar la orden de trabajo abierta
    const workOrder = await WorkOrder.findOne({ isOpen: true }).populate('tires');

    if (!workOrder) {
      return res.status(400).json({
        success: false,
        message: "No hay una orden de trabajo abierta.",
      });
    }

    // Calcular la nueva línea dentro de esta orden de trabajo
    let nuevaLinea = 1;
    if (workOrder.tires.length > 0) {
      // Buscar el número máximo en las llantas de esta orden
      const ultimaLlanta = workOrder.tires.reduce(
        (max, tire) => (tire.linea > max ? tire.linea : max),
        0
      );
      nuevaLinea = ultimaLlanta + 1;
    }

    // Crear la nueva llanta
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
      user: req.user.id, // Referenciar la llanta al usuario
    });

    const savedTire = await newTire.save();

    // Agregar la llanta a la orden de trabajo
    workOrder.tires.push(savedTire);
    await workOrder.save();

    res.json({ success: true, savedTire });
  } catch (error) {
    console.error("Error al agregar llanta:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const getTire = async (req, res) => {
  const tire = await Tire.findById(req.params.id).populate({
    path: "user",
    // select: "name lastName _id", // Lista de campos que deseas poblar
  });
  if (!tire) return res.status(404).json({ message: "Tire not found" });
  res.json(tire);
};

export const deleteTire = async (req, res) => {
  const tire = await Tire.findByIdAndDelete(req.params.id);
  if (!tire) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
};

export const updateTire = async (req, res) => {
  const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tire) return res.status(404).json({ message: "Tire not found" });
  res.json(tire);
};
