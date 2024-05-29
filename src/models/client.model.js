import { model, Schema } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    ref: "Client",
    type: Schema.Types.ObjectId,
  },
});

export default model("Client", clientSchema);
