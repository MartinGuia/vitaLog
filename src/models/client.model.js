import { model, Schema } from "mongoose";

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  adress1: {
    type: String,
    required: true,
  },
  adress2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  user: {
    ref: "Client",
    type: Schema.Types.ObjectId,
  },
});

export default model("Client", clientSchema);
