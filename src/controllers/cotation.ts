import { Request, Response } from "express";
import CryptoApi from "kenzie/dist/services/crypto";

export default class CotationController {
  readonly baseQuotes = ["BTC", "ETH", "DOGE", "ADA", "LTC"];
  readonly api: CryptoApi = new CryptoApi(process.env.KEY!);
  getAllCotations = async (req: Request, res: Response) => {
    const params = (req.query?.currency as string[]) ?? this.baseQuotes;
    const quotes = await this.api.quotes(params);

    return res.send(quotes);
  };
}
