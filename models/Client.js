import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    lga: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
