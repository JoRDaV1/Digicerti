import mongoose, { Document } from "mongoose";

export interface IIssuer extends Document {
  name: string;
  email: string;
  mobile: number;
  password: string;
  noofcourses?: number;
  noofstudents?: number;
}

const IssuerDBSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  noofcourses: {
    type: Number,
  },
  noofstudents: {
    type: Number,
  },
});
const IssuerModel = mongoose.model<IIssuer>("Issuer", IssuerDBSchema);
export default IssuerModel;
