import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

export default function () {
  const controller = new UserController();
  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
}
