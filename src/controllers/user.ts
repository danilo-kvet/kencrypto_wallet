import { User, Wallet } from "../models";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface Error {
  code: number;
}

export default class UserController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await User.create({
        username,
        password,
      });
      await Wallet.create({
        user: user._id,
        currency: {
          USD: 0,
          BTC: 0,
          ETH: 0,
          DOGE: 0,
          ADA: 0,
          LTC: 0,
        },
      });

      return res.json(user);
    } catch (error) {
      if ((error as Error).code === 11000) {
        return res.status(403).send({ error: "Username already taken." });
      }
      return res.status(400).send({ error: "Failed to create user." });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).send({ user: "Not Found" });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ error: "Incorrect password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET!);

      return res.json({ token });
    } catch (error) {
      return res.status(400).send({ error: "Failed to create user" });
    }
  }
}
