import { model, Schema } from "mongoose";

const workOrderSchema = new Schema(
  {
    numero: {
      type: Number,
      unique: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client", // Referenciar al modelo de cliente (si existe)
    },
    tires: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tire",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Referenciar al modelo de usuario
      required: true,
    },
    quoteWorkOrder: {
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

export default model("WorkOrder", workOrderSchema);
