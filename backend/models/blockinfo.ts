import mongoose, { Document, Schema } from "mongoose";

interface Blockinfo extends Document {
  id: string;
  transhash: string;
  chainId: number;
  from: string;
  to: string;
}

const blockinfoSchema: Schema<Blockinfo> = new Schema<Blockinfo>({
  id: {
    type: String,
    required: true,
  },
  transhash: {
    type: String,
    required: true,
  },
  chainId: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Blockinfo>("Block", blockinfoSchema);
