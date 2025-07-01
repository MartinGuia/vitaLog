import { model, Schema } from "mongoose";

const clientSchema = new Schema(
  {
    clientCode: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: true,
    },
    Rfc: {
      type: String,
      required: false,
    },
    interiorNumber: {
      type: String,
      required: false,
    },
    externalNumber: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    suburb: {
      type: String,
      required: false,
    },
    zipCode: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    municipality: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    eMail: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Client", clientSchema);
