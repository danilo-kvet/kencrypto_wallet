import { Request, Response } from "express";
import CryptoApi from "kenzie/dist/services/crypto";
import { Wallet } from "../models";

type values = "BTC" | "ETH" | "DOGE" | "ADA" | "LTC" | "USD";

export default class WalletController {
  readonly api: CryptoApi = new CryptoApi(process.env.KEY!);
  readonly baseQuotes: values[] = ["BTC", "ETH", "DOGE", "ADA", "LTC", "USD"];

  async getValues(req: Request, res: Response) {
    try {
      const user = req.user!;
      const wallet = await Wallet.findOne({ user: user._id });

      return res.send(wallet);
    } catch (error) {
      return res.send(error);
    }
  }

  async deposit(req: Request, res: Response) {
    try {
      const user = req.user!;
      const { amount } = req.body;
      const wallet = (await Wallet.findOne({ user: user._id }))!;

      wallet.currency.USD += amount;
      await wallet.save();

      return res.send(wallet);
    } catch (error) {
      return res.send(error);
    }
  }

  public transfer = async (req: Request, res: Response) => {
    try {
      const user = req.user!;
      const { amount, from, to }: { amount: number; from: values; to: values } =
        req.body;
      const wallet = (await Wallet.findOne({ user: user._id }))!;

      if (!this.baseQuotes.includes(from) || !this.baseQuotes.includes(to)) {
        return res.status(422).send({ error: "Unsupported currency" });
      }

      if (wallet.currency[from] < amount) {
        return res.status(400).send({ error: "Insuficient funds" });
      }
      const { data } = await this.api.conversion(from, amount, to);
      wallet.currency[from] -= amount;
      wallet.currency[to] += data.quote[to].price;
      await wallet.save();

      return res.send(wallet);
    } catch (error) {
      return res.send(error);
    }
  };
}
