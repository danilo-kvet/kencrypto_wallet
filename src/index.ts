import "dotenv/config";
import express from "express";
import RouterInitializer from "./routes";
import passport from "./middlewares/auth";

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(RouterInitializer());

async function start() {
  await require("./loaders").default();

  app.listen(process.env.PORT, () => {
    console.log(`Running at http://localhost:${process.env.PORT}`);
  });
}

start();
