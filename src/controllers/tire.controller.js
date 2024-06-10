import Tire from "../models/tire.model.js";

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
      status,
      date,
    } = req.body;

    console.log(req.user);
    // Encuentra la última llanta registrada para esta orden de trabajo
    const ultimaLlanta = await Tire.findOne({}).sort({ linea: -1 });

    let nuevaLinea = 1; // Si no hay llantas registradas aún, inicia en 1

    if (ultimaLlanta) {
      nuevaLinea = ultimaLlanta.linea + 1; // Incrementa el número de línea
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
      status,
      date,
      user: req.user.id,
    });

    const savedTire = await newTire.save();
    res.json(savedTire);
  } catch (error) {
    console.error("Error al crear llantas:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const getTire = async (req, res) => {
  const task = await Tire.findById(req.params.id).populate({
    path: "user",
    select: "name lastName _id", // Lista de campos que deseas poblar
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
