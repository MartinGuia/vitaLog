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

    const formatFecha = (date) => {
      return date.toLocaleDateString("es-MX");
    };
    // Obtener órdenes con detalles de llantas
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
          let: { tireIds: "$tires", numero: "$numero", orderId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$tireIds"] },
              },
            },
            {
              $addFields: {
                orderNumber: "$$numero",
                workOrder: "$$orderId",
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
        message:
          "No se encontraron órdenes de trabajo para este cliente en el rango especificado.",
      });
    }

    const order = workOrders[0];
    const tires = order.tires;

    const totalRejections = tires.filter((t) => t.rejection).length;
    const totalTires = tires.length;
    const workOrderIds = tires.map((t) => t.workOrder);

    const client = await Client.findById(clientId).select("companyName");

    const aggregateStats = await Tire.aggregate([
      {
        $match: {
          workOrder: { $in: workOrderIds },
        },
      },
      {
        $facet: {
          continentalBands: [
            {
              $match: {
                appliedBand: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$appliedBand",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          bandagBands: [
            {
              $match: {
                appliedBandBandag: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$appliedBandBandag",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          tireMeasurementsUsed: [
            {
              $match: {
                helmetMeasurement: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$helmetMeasurement",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          brandsUsed: [
            {
              $match: {
                brand: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$brand",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          modelsUsed: [
            {
              $match: {
                modelTire: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$modelTire",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
          rejectionReasons: [
            {
              $match: {
                rejection: { $exists: true, $ne: null, $ne: "" },
              },
            },
            {
              $group: {
                _id: "$rejection",
                count: { $sum: 1 },
              },
            },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const {
      continentalBands,
      bandagBands,
      tireMeasurementsUsed,
      brandsUsed,
      modelsUsed,
      rejectionReasons,
    } = aggregateStats[0];

    // Limpieza final
    const formattedTires = tires.map((tire) => ({
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

    const report = {
      clientId,
      clientName: client?.companyName || "Cliente desconocido",
      totalOrders: order.totalOrders,
      totalRejections,
      totalTires,
      tires: formattedTires,
      mostUsedContinentalBands: continentalBands,
      mostUsedBandagBands: bandagBands,
      tireMeasurementsUsed,
      mostUsedBrands: brandsUsed,
      mostUsedModels: modelsUsed,
      rejectionReasons,

      startDate: formatFecha(start),
      endDate: formatFecha(end),
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

export const getAnnualReportByMonth = async (req, res) => {
  try {
    const { year } = req.body;

    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year}-12-31T23:59:59.999Z`);

    // 1. Órdenes por mes, con detalles de cliente y llantas
    const workOrders = await WorkOrder.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          isOpen: false,
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client",
          foreignField: "_id",
          as: "clientInfo",
        },
      },
      {
        $unwind: "$clientInfo",
      },
      {
        $lookup: {
          from: "tires",
          let: { tireIds: "$tires", numero: "$numero", orderId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$tireIds"] },
              },
            },
            {
              $addFields: {
                orderNumber: "$$numero",
                workOrder: "$$orderId",
              },
            },
          ],
          as: "tiresDetails",
        },
      },
      {
        $addFields: {
          month: { $month: "$createdAt" },
        },
      },
      // NUEVO: agrupación por cliente dentro de cada mes
      {
        $group: {
          _id: {
            month: "$month",
            clientId: "$clientInfo._id",
            clientName: "$clientInfo.companyName",
          },
          totalOrders: { $sum: 1 },
          tires: { $push: "$tiresDetails" },
        },
      },
      {
        $project: {
          month: "$_id.month",
          clientId: "$_id.clientId",
          clientName: "$_id.clientName",
          totalOrders: 1,
          tires: {
            $reduce: {
              input: "$tires",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $addFields: {
          totalTires: { $size: "$tires" },
          totalRejections: {
            $size: {
              $filter: {
                input: "$tires",
                as: "t",
                cond: { $ifNull: ["$$t.rejection", false] },
              },
            },
          },
        },
      },
      { $sort: { month: 1, clientName: 1 } },
    ]);

    // 2. Estadísticas generales
    const globalStats = await Tire.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $facet: {
          continentalBands: [
            {
              $match: { appliedBand: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$appliedBand", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          bandagBands: [
            {
              $match: { appliedBandBandag: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$appliedBandBandag", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          tireMeasurementsUsed: [
            {
              $match: { helmetMeasurement: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$helmetMeasurement", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          brandsUsed: [
            {
              $match: { brand: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$brand", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          modelsUsed: [
            {
              $match: { modelTire: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$modelTire", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
          rejectionReasons: [
            {
              $match: { rejection: { $exists: true, $ne: null, $ne: "" } },
            },
            { $group: { _id: "$rejection", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    // 3. Generar resumen por mes con 12 meses fijos
    const generateEmptyYear = () => {
      const months = [];
      for (let i = 1; i <= 12; i++) {
        months.push({
          month: i,
          totalOrders: 0,
          totalTires: 0,
          totalRejections: 0,
          clients: [],
        });
      }
      return months;
    };

    const fullYearSummary = generateEmptyYear();

    // 4. Insertar datos de clientes dentro del resumen mensual
    workOrders.forEach((entry) => {
      const index = fullYearSummary.findIndex((m) => m.month === entry.month);
      if (index !== -1) {
        // Sumar totales por mes
        fullYearSummary[index].totalOrders += entry.totalOrders;
        fullYearSummary[index].totalTires += entry.totalTires;
        fullYearSummary[index].totalRejections += entry.totalRejections;

        // Agregar cliente al mes
        fullYearSummary[index].clients.push({
          clientId: entry.clientId,
          clientName: entry.clientName,
          totalOrders: entry.totalOrders,
          totalTires: entry.totalTires,
          totalRejections: entry.totalRejections,
        });
      }
    });

    // 5. Enviar reporte
    const report = {
      year,
      monthlySummary: fullYearSummary,
      mostUsedContinentalBands: globalStats[0].continentalBands,
      mostUsedBandagBands: globalStats[0].bandagBands,
      tireMeasurementsUsed: globalStats[0].tireMeasurementsUsed,
      mostUsedBrands: globalStats[0].brandsUsed,
      mostUsedModels: globalStats[0].modelsUsed,
      rejectionReasons: globalStats[0].rejectionReasons,
    };

    res.status(200).json({ report });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al generar el reporte anual por mes",
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
          appliedBand: { $exists: true, $ne: null, $ne: "" },
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
          appliedBandBandag: { $exists: true, $ne: null, $ne: "" },
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
