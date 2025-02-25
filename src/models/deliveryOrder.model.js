import { model, Schema } from "mongoose";

const deliveryOrderSchema = new Schema(
  {
    numero: {
      type: Number,
      default: true,
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
  },
  {
    versionKey: false,
  }
);

export default model("DeliveryOrder", deliveryOrderSchema); // Nombre del modelo y esquema de MongoDB para DeliveryOrder
