import Tire from "../models/tire.model.js";
import WorkOrder from "../models/workOrders.model.js";
import mongoose from "mongoose";
import Client from "../models/client.model.js";

export const getReportByClient = async (req, res) => {
  try {
    const { clientId, startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
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
        $lookup: {
          from: "tires",
          let: { tireIds: "$tires", numero: "$numero" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$tireIds"] },
              },
            },
            {
              $addFields: {
                orderNumber: "$$numero",
              },
            },
          ],
          as: "tiresDetails",
        },
      },
      {
        $group: {
          _id: "$client",
          tires: { $push: "$tiresDetails" },
          totalOrders: { $addToSet: "$_id" },
        },
      },
      {
        $project: {
          totalOrders: { $size: "$totalOrders" },
          tires: {
            $reduce: {
              input: "$tires",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    if (!workOrders.length) {
      return res.status(404).json({
        message: "No se encontraron órdenes de trabajo para este cliente en el rango especificado.",
      });
    }

    const order = workOrders[0];

    const tires = order.tires.map((tire) => ({
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
      antiquityDot: tire.antiquityDot || null,
      serialNumber: tire.serialNumber || null,
      orderNumber: tire.orderNumber || null,
    }));

    const totalRejections = tires.filter((tire) => tire.rejection).length;
    const totalTires = tires.length;

    // Puedes hacer este query aparte si necesitas el nombre del cliente
    const client = await Client.findById(clientId).select("companyName");

    const report = {
      clientId,
      clientName: client?.companyName || "Cliente desconocido",
      totalOrders: order.totalOrders,
      totalRejections,
      totalTires,
      tires,
    };

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
