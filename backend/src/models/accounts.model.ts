import mongoose, { Schema, model, Types } from "mongoose";

export interface IAccounts {
  _id: Types.ObjectId;
  AccUsuId: Types.ObjectId;
  AccNom: string;
  AccTip: "dinheiro" | "debito" | "credito" | "investimento";
  AccBanId: string; //Types.ObjectId; // Se aplicável
  AccSalIni: number;
  AccSalAtu: number;
  AccMoe: string; // "BRL", "USD", etc.
  AccDatCri: Date;
}

export const accountsSchema = new Schema<IAccounts>(
  {
    AccUsuId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    AccNom: { type: String, required: true },
    AccTip: {
      type: String,
      required: true,
      enum: ["dinheiro", "debito", "credito", "investimento"],
    },
    AccBanId: { type: String, required: true },
    /* AccBanId: {
      type: Schema.Types.ObjectId,
      required: true,
    }, */
    AccSalIni: { type: Number, required: true },
    AccSalAtu: { type: Number, required: true },
    AccMoe: { type: String, required: true },
    AccDatCri: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default model<IAccounts>("Account", accountsSchema);
