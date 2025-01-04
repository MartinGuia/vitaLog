import { model, Schema } from "mongoose";

const tireSchema = new Schema(
  {
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
      // required: true,
    },
    helmetMeasurement: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    helmetDesign: {
      type: String,
      required: false,
    },
    requiredBand: {
      type: String,
      required: true,
    },
    antiquityDot: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    rejection:{
      type: String,
      required: false,
    },
    workOrder: { 
        type: Schema.Types.ObjectId, 
        ref: "WorkOrder" 
    },
  },
  {
    timestamps: true,
  }
);

export default model("Tire", tireSchema);
