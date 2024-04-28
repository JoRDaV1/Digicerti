import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fname: string;
  lname?: string;
  email: string;
  mobile: number;
  password: string;
  noofcertifications?: number;
  noofissuers?: number;
}

const UserSchema: Schema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: String,
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
  noofcertifications: {
    type: Number,
  },
  noofissuers: {
    type: Number,
  },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
