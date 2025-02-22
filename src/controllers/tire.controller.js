import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";
import { format } from "date-fns";
// import User from "../models/user.model.js";
// import Client from "../models/client.model.js";

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
    const workOrder = await WorkOrder.findOne({ isOpen: true }).populate(
      "tires"
    );

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
      workOrder: workOrder._id, // Asignar la referencia de la orden de trabajo
    });

    const savedTire = await newTire.save();

    // Agregar la llanta a la orden de trabajo
    workOrder.tires.push(savedTire);
    await workOrder.save();

    res.json({ success: true, savedTire });
  } catch (error) {
    console.error("Error al agregar llanta:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const getTire = async (req, res) => {
  try {
    const tire = await Tire.findById(req.params.id)
      .populate({
        path: "user",
        select: "name lastName _id", // Lista de campos que deseas poblar
      })
      .populate({
        path: "workOrder",
        select: "client tires", // Lista de campos que deseas poblar
        populate: {
          path: "client numero",
          select: "name",
        },
      });

    if (!tire) return res.status(404).json({ message: "Tire not found" });

    const formattedTire = {
      ...tire.toObject(),
      formattedUpdatedAt: format(new Date(tire.updatedAt), "dd/MM/yyyy"), // Ajusta el formato según tus necesidades
    };

    res.json(formattedTire);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro", error });
  }
};

export const updateTire = async (req, res) => {
  const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!tire) return res.status(404).json({ message: "Tire not found" });
  res.json(tire);
};

export const updateFinalTire = async (req, res) => {
  // Asegúrate de que el campo inspection se actualice a true
  const updatedData = {
    ...req.body,
    inspection: true, // Forzar el valor de inspection a true
  };

  const tire = await Tire.findByIdAndUpdate(req.params.id, updatedData, {
    new: true, // Devuelve el documento actualizado
  });

  if (!tire) return res.status(404).json({ message: "Tire not found" });
  res.json(tire);
};

export const getTireByBarcode = async (req, res) => {
  try {
    const { barCode } = req.body;

    // Verifica si se recibió el código de barras
    if (!barCode) {
      return res
        .status(400)
        .json({ message: "El código de barras es requerido." });
    }

    // Busca un registro de llanta que coincida con el código de barras
    const tire = await Tire.findOne({ barCode })
      // .populate("user")
      .populate("workOrder");

    if (!tire) {
      return res.status(404).json({
        message: "No se encontró ninguna llanta con ese código de barras.",
      });
    }

    // Devuelve los datos de la llanta encontrada
    return res.status(200).json(tire);
  } catch (error) {
    console.error("Error al buscar la llanta por código de barras:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getTiresWithInspection = async (req, res) => {
  try {
    // Filtrar registros donde inspection sea true
    const tires = await Tire.find({ inspection: true }).populate({
      path: "workOrder",
      select: "numero",
    });

    // Verificar si existen registros
    if (!tires || tires.length === 0) {
      return res
        .status(404)
        .json({ message: "No tires found with inspection set to true" });
    }

    // Enviar los registros como respuesta
    res.json(tires);
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ message: "Error retrieving tires" });
  }
};

export const getTiresByHelmetDesign = async (req, res) => {
  try {
    const tires = await Tire.aggregate([
      { $match: { user: req.user.id } }, // Filtrar por usuario
      { 
        $group: { 
          _id: "$helmetDesign", 
          count: { $sum: 1 } 
        } 
      }
    ]);

    res.json(tires);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos", error });
  }
};