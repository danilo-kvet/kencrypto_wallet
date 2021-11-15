import { Schema, model } from "mongoose";

interface Wallet {
  currency: {
    USD: number;
    BTC: number;
    ETH: number;
    DOGE: number;
    ADA: number;
    LTC: number;
  };
  user: Schema.Types.ObjectId;
}

const walletSchema = new Schema<Wallet>({
  currency: {
    USD: { type: Number },
    BTC: { type: Number },
    ETH: { type: Number },
    DOGE: { type: Number },
    ADA: { type: Number },
    LTC: { type: Number },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default model<Wallet>("Wallet", walletSchema);
