import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";
import mongoose from "mongoose";

export const getReportByClient = async (req, res) => {
  try {
    const { clientId, startDate, endDate } = req.body;

    // Convertir fechas a objetos Date y ajustar a inicio/fin del día
    let start = new Date(startDate);
    let end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const workOrders = await WorkOrder.aggregate([
      {
        $match: {
          client: new mongoose.Types.ObjectId(clientId),
          createdAt: { $gte: start, $lte: end },
          isOpen: false,
        },
      },
      {
        $group: {
          _id: "$client",
          totalOrders: { $sum: 1 },
          allTires: { $push: "$tires" }, // Acumula arrays de llantas
        },
      },
      {
        $project: {
          totalOrders: 1,
          tires: {
            $reduce: {
              input: "$allTires",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $lookup: {
          from: "tires",
          localField: "tires",
          foreignField: "_id",
          as: "tireInfo",
        },
      },
    ]);

    // Si no hay resultados
    if (workOrders.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron órdenes de trabajo para este cliente en el rango especificado.",
      });
    }

    // Procesar los datos para el reporte
    const report = workOrders.map((order) => {
      const tires = order.tireInfo.map((tire) => ({
        barCode: tire.barCode,
        brand: tire.brand,
        model: tire.modelTire,
        requiredBand: tire.requiredBand,
        appliedBand: tire.appliedBand,
        millimeterFootage: tire.millimeterFootage,
        helmetMeasurement: tire.helmetMeasurement,
        appliedBandBandag: tire.appliedBandBandag || null,
        patch: tire.patch || null,
        patch2: tire.patch2 || null,
        patch3: tire.patch3 || null,
        patch4: tire.patch4 || null,
        rejection: tire.rejection || null,
        status: tire.status || null,
      }));

      const totalRejections = tires.filter((tire) => tire.rejection).length;
      const totalTires = tires.length;

      return {
        clientId: order._id,
        totalOrders: order.totalOrders,
        totalRejections,
        totalTires,
        tires,
      };
    });

    res.status(200).json({ report });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: ["Error al generar el reporte"],
      error: error.message,
    });
  }
};


export const getTiresWithContinentalBand = async (req, res) => {
  try {
    const helmetDesignCounts = await Tire.aggregate([
      {
        $match: {
          inspection: true,
          appliedBand: { $exists: true, $ne: null, $ne: "" }
        },
      },
      {
        $group: {
          _id: "$appliedBand",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(helmetDesignCounts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las llantas", error });
  }
};

export const getTiresWithBandagBand = async (req, res) => {
  try {
    const helmetDesignCounts = await Tire.aggregate([
      {
        $match: {
          inspection: true,
          appliedBandBandag: { $exists: true, $ne: null, $ne: "" }
        },
      },
      {
        $group: {
          _id: "$appliedBandBandag",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(helmetDesignCounts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las llantas", error });
  }
};
