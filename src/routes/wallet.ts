import { Router } from "express";
import passport from "../middlewares/auth";
import { WalletController } from "../controllers";

const router = Router();
export default function () {
  const controller = new WalletController();
  router.get(
    "/wallet",
    passport.authenticate("jwt", { session: false }),
    controller.getValues
  );
  router.post(
    "/deposit",
    passport.authenticate("jwt", { session: false }),
    controller.deposit
  );
  router.post(
    "/transfer",
    passport.authenticate("jwt", { session: false }),
    controller.transfer
  );

  return router;
}
