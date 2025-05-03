import { model, Schema } from "mongoose";

const clientSchema = new Schema(
  {
    clientCode: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    Rfc: {
      type: String,
      required: true,
    },
    interiorNumber: {
      type: String,
      required: true,
    },
    externalNumber: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    suburb: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    eMail: {
      type: String,
      required: false,
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    // alias: {
    //   type: String,
    //   required: true,
    // },
    // address1: {
    //   type: String,
    //   required: true,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // region: {
    //   type: String,
    //   required: true,
    // },
    // zipCode: {
    //   type: String,
    //   required: true,
    // },
    // country: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    versionKey: false,
  }
);

export default model("Client", clientSchema);
