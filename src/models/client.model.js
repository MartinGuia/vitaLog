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
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
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
  // user: {
  //   ref: "Client",
  //   type: Schema.Types.ObjectId,
  // },
});

export default model("Client", clientSchema);
