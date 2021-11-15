import { Router } from "express";
import cotationRouter from "./cotation";
import userRouter from "./user";
import walletRouter from "./wallet";

export default function () {
  const router = Router();
  router.use(cotationRouter());
  router.use(userRouter());
  router.use(walletRouter());

  return router;
}
