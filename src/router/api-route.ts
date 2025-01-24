import express from "express";
import { CostumerController } from "../controller/costumer-controller";

const apiRouter = express.Router();

apiRouter.get("/api/costumer", CostumerController.getAllCostumer);

export { apiRouter };
