import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";
import { format } from "date-fns";

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
  const {
    itemCode,
    barCode,
    antiquityDot,
    requiredBand,
    helmetMeasurement,
    brand,
    modelTire,
    serialNumber,
    millimeterFootage,
    date,
  } = req.body;

  try {
    const userId = req.user._id || req.user.id;

    // Buscar la orden de trabajo abierta del usuario actual
    const workOrder = await WorkOrder.findOne({
      isOpen: true,
      createdBy: userId,
    }).populate("tires");

    if (!workOrder) {
      return res.status(400).json({
        success: false,
        message: "No hay una orden de trabajo abierta para este usuario.",
      });
    }

    const tireFound = await Tire.findOne({ barCode });
    if (tireFound) {
      return res
        .status(400)
        .json(["La llanta con el código de barras ingresado ya existe."]);
    }

    let nuevaLinea = 1;
    if (workOrder.tires.length > 0) {
      const ultimaLlanta = workOrder.tires.reduce(
        (max, tire) => (tire.linea > max ? tire.linea : max),
        0
      );
      nuevaLinea = ultimaLlanta + 1;
    }

    const newTire = new Tire({
      linea: nuevaLinea,
      itemCode,
      barCode,
      helmetMeasurement,
      brand,
      requiredBand,
      antiquityDot,
      modelTire,
      serialNumber,
      millimeterFootage,
      date,
      user: userId,
      workOrder: workOrder._id,
    });

    const savedTire = await newTire.save();

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
          select: "companyName",
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

export const updateProductionTire = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

export const getTireByBarcode = async (req, res) => {
  try {
    const { barCode } = req.body;

    // Verifica si se recibió el código de barras
    if (!barCode) {
      return res
        .status(400)
        .json({ message: ["El código de barras es requerido."] });
    }

    // Busca un registro de llanta que coincida con el código de barras
    const tire = await Tire.findOne({ barCode }).populate("workOrder");

    if (!tire) {
      return res.status(404).json({
        message: ["No se encontró ninguna llanta con ese código de barras."],
      });
    }

    // Devuelve los datos de la llanta encontrada
    return res.status(200).json(tire);
  } catch (error) {
    console.error("Error al buscar la llanta por código de barras:", error);
    return res.status(500).json({ message: ["Error interno del servidor."] });
  }
};

export const getTiresWithInspection = async (req, res) => {
  try {
    // Filtrar registros donde inspection sea true
    const tires = await Tire.find({ inDeliveryNote: false, inspection: true })
      .sort({ createdAt: -1 })
      .populate({
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

export const deleteTire = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la llanta
    const tire = await Tire.findById(id);
    if (!tire) return res.status(404).json(["Llanta no encontrada"]);

    // Obtener la orden de trabajo asociada
    const workOrderId = tire.workOrder;
    if (!workOrderId) {
      return res.status(400).json(["La llanta no tiene una orden asociada"]);
    }

    // Eliminar la llanta
    await Tire.findByIdAndDelete(id);

    // Actualizar la orden de trabajo eliminando la referencia a la llanta
    await WorkOrder.findByIdAndUpdate(
      workOrderId,
      { $pull: { tires: id } },
      { new: true }
    );

    res.json(["Llanta eliminada correctamente y orden actualizada"]);
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};


export const updateQuoteTires = async (req, res) => {
  try {
    const { tireIds } = req.body; // arreglo de IDs de llantas

    if (!Array.isArray(tireIds) || tireIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron llantas a actualizar." });
    }

    const result = await Tire.updateMany(
      { _id: { $in: tireIds } }, // condición: múltiples IDs
      { $set: { quoteTires: true } } // actualización
    );

    res.json({ success: true, updatedCount: result.modifiedCount });
  } catch (error) {
    console.error("Error al actualizar quoteTires:", error);
    res.status(500).json({
      message: "Error al actualizar las llantas para cotización",
      error,
    });
  }
};

export const getQuoteTires = async (req, res) => {
  try {
    const tires = await Tire.find({
      quoteTires: true,
      inspection: true,
    }).populate({
      path: "workOrder",
      select: "numero",
    });

    if (!tires || tires.length === 0) {
      return res.status(404).json({
        message:
          "No tires found with both quoteTires and inspection set to true",
      });
    }

    res.json(tires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tires" });
  }
};
