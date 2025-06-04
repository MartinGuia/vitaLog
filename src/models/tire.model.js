import { model, Schema } from "mongoose";

const tireSchema = new Schema(
  {
    //! ---------------- Datos para orden de trabajo ---------------------
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    linea: {
      type: Number,
      // required: true,
    },
    itemCode: {
      type: String,
      required: true,
    },
    barCode: {
      type: String,
      required: true,
      // unique: true,
    },
    helmetMeasurement: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: false,
    },
    requiredBand: {
      type: String,
      required: false,
    },
    antiquityDot: {
      type: String,
      required: false,
    },
    modelTire: {
      type: String,
      required: false,
    },
    serialNumber: {
      type: String,
      required: false,
    },
    millimeterFootage: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    
    //! ---------------- Datos para produccion ---------------------
    status: {
      type: String,
      required: false,
    },
    patch: {
      type: String,
      required: false,
    },
    patch2: {
      type: String,
      required: false,
    },
    patch3: {
      type: String,
      required: false,
    },
    patch4: {
      type: String,
      required: false,
    },
    numberPatches: {
      type: Number,
      required: false,
    },
    numberPatches2: {
      type: Number,
      required: false,
    },
    numberPatches3: {
      type: Number,
      required: false,
    },
    numberPatches4: {
      type: Number,
      required: false,
    },
    rejection: {
      type: String,
      required: false,
    },
    appliedBand: {
      type: String,
      required: false,
    },
    appliedBandBandag: {
      type: String,
      required: false,
    },
    workOrder: {
      type: Schema.Types.ObjectId,
      ref: "WorkOrder",
    },

    //! ----------------Cambia al pasar por producción ---------------------
    inspection: {
      type: Boolean,
      required: false,
      default: false, // Configurar el valor predeterminado como false
    },

    inDeliveryNote:{
      type: Boolean,
      required: false,
      default: false
    },  

    //! ----------------Cambia al cotizar ---------------------
    quoteTires: {
      type: Boolean,
      required: false,
    },
    quoteNumber: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Tire", tireSchema);
