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
      required: true,
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
    numberPatches:{
      type: Number,
      required: false,
    },
    numberPatches2:{
      type: Number,
      required: false,
    },
    numberPatches3:{
      type: Number,
      required: false,
    },
    numberPatches4:{
      type: Number,
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
