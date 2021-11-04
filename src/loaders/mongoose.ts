import mongoose from "mongoose";
import { Db } from "mongodb";
import databaseConfig from "../config/database";

export default async (): Promise<Db> => {
  const pool = await mongoose.connect(databaseConfig.dev, {
    user: process.env.MONGO_DB_USER,
    pass: process.env.MONGO_DB_PASSWORD,
  });

  return pool.connection.db;
};
