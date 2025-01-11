import { model, Schema } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        ref: "User",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model("Department", departmentSchema);
