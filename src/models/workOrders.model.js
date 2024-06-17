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
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default model("WorkOrder", workOrderSchema);
