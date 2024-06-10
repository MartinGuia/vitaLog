import { model, Schema } from "mongoose";

const workOrderSchema = new Schema({
  tires: [{
    ref: "Tire",
    type: Schema.Types.ObjectId,
  }],
  closed: {
    type: Boolean,
    default: false,
  },
});

export default model("WorkOrder", workOrderSchema);
