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
