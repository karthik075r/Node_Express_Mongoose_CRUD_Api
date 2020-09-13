// const Schema: any = mongoose.Schema;
import mongoose, { Document, model, Model } from "mongoose";
const Schema = mongoose.Schema;
const AddressSchema = new Schema(
  {
    city: { type: String, trim: true, required: true },
    country: { type: String, trim: true },
    zip: { type: String, trim: true },
  },
  { _id: false, timestamps: false }
);
const Employee = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    phoneNumber: { type: String, trim: true },
    address: AddressSchema,
  },
  { _id: true, timestamps: true }
);

let emp = mongoose.model("Employee", Employee);

export default emp;
