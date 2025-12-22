import { Schema, model, Types } from "mongoose";

export interface ICreditCard {
  CreUsuId: Types.ObjectId;
  CreLim: number;
  CreDiaFech: number;
  CreDiaVenc: number;
  CreAccPagId: Types.ObjectId;
  CreDatCri: Date;
}

const creditCardSchema = new Schema<ICreditCard>({
  CreUsuId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  CreLim: { type: Number, required: true },
  CreDiaFech: { type: Number, required: true },
  CreDiaVenc: { type: Number, required: true },
  CreAccPagId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  CreDatCri: { type: Date, default: Date.now }
});

export default model<ICreditCard>("CreditCard", creditCardSchema);


