import mongoose, { Schema, model, Types } from "mongoose";

export interface IBank {
  _id: Types.ObjectId;
  BanNom: string;
  BanSta: number;
  BanIco: string;
}

export const bankSchema = new Schema<IBank>(
  {
    BanNom: { type: String, required: true },
    BanSta: { type: Number, required: true },
    BanIco: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IBank>("Bank", bankSchema);
