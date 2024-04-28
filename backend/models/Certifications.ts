import mongoose, { Document, Schema } from "mongoose";

interface ICertification extends Document {
  issueremail: string;
  coursename: string;
  issuername: string;
  certificatetype: string;
}

const CertificationsSchema: Schema = new Schema({
  issueremail: {
    type: String,
    required: true,
  },
  coursename: {
    type: String,
    required: true,
    unique: true,
  },
  issuername: {
    type: String,
    required: true,
  },
  certificatetype: {
    type: String,
    required: true,
  },
});

const Certifications = mongoose.model<ICertification>(
  "Certifications",
  CertificationsSchema
);

export default Certifications;
