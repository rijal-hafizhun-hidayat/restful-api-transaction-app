import express from "express";
import { CostumerController } from "../controller/costumer-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";

const apiRouter = express.Router();

apiRouter.get(
  "/api/transaction/code",
  TransactionController.getCodeTransaction
);

apiRouter.get("/api/costumer", CostumerController.getAllCostumer);

apiRouter.get("/api/item", ItemController.getAllItem);

export { apiRouter };
