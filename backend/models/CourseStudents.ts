import mongoose, { Schema, Document } from "mongoose";

interface IStudentsList extends Document {
  coursename: string;
  issueremail: string;
  issuername: string;
  StudentName: string;
  Grade: string;
  StudentEmail: string;
  certificatetype: number;
  Date: Date;
  img: string;
}

const studentslistDBSchema: Schema = new Schema({
  coursename: {
    type: String,
    ref: "Certificate",
  },
  issueremail: {
    type: String,
  },
  issuername: {
    type: String,
  },
  StudentName: {
    type: String,
  },
  Grade: {
    type: String,
  },
  StudentEmail: {
    type: String,
  },
  certificatetype: {
    type: Number,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  img: {
    type: String,
    default: "image",
  },
});

const StudentsList = mongoose.model<IStudentsList>(
  "studentslist",
  studentslistDBSchema
);

export default StudentsList;
