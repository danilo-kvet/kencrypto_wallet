import "dotenv/config";
import express from "express";

const app = express();

async function start() {
  await require("./loaders").default();

  app.listen(process.env.PORT, () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
  });
}

start();
