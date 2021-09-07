import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import Database from "./db/connection";
import recadoRoutes from "./routes/recadoRoute";
var cors = require("cors");

const app = express();
dotenv.config();

//connectDB
const db = new Database().openConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", recadoRoutes);
app.get("/", (req: Request, res: Response) => {
    res.send("API online!");
});

export default app;
