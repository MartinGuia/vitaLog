import { model, Schema } from "mongoose";

const workOrderSchema = new Schema({
  numero: {
    type: Number,
    unique: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  tires: [{
    type: Schema.Types.ObjectId,
    ref: 'Tire',
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Asumiendo que tienes un modelo de usuario
    required: true,
  },
});

export default model("WorkOrder", workOrderSchema);
