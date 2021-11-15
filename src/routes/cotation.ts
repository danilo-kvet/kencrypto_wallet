import { Router } from "express";
import { CotationController } from "../controllers";

const router = Router();

export default function () {
  const controller = new CotationController();
  router.get("/quotes", controller.getAllCotations);

  return router;
}
