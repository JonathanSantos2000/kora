import mongoose, { Schema, model, Types } from "mongoose";

export interface ITag {
  _id: Types.ObjectId;
  TagUsuId: Types.ObjectId | null; // null se for categoria padrão
  TagNom: string;
  TagTip: "receita" | "despesa";
  TagRef: string;
}

export const tagSchema = new Schema<ITag>(
  {
    TagUsuId: { type: Types.ObjectId, ref: "User", required: false, default: null },
    TagNom: { type: String, required: true },
    TagTip: {
      type: String,
      required: true,
      enum: ["receita", "despesa"],
    },
    TagRef: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<ITag>("Tag", tagSchema);
