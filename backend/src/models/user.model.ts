import mongoose, { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  UsuNom: string;
  UsuEma: string;
  UsuSen: string;
  UsuPer: string;
  UsuDatCad: Date;
}

export const userSchema = new Schema<IUser>(
  {
    UsuNom: { type: String, required: true },
    UsuEma: { type: String, required: true, unique: true },
    UsuSen: { type: String, required: true },
    UsuPer: { type: String },
    UsuDatCad: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default mongoose.model<IUser>("User", userSchema);
