import express from "express";
import { CustomerController } from "../controller/customer-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";

const apiRouter = express.Router();

apiRouter.post("/api/transaction", TransactionController.storeTransaction);
apiRouter.get(
  "/api/transaction/code",
  TransactionController.getCodeTransaction
);

apiRouter.get("/api/customer", CustomerController.getAllCostumer);

apiRouter.get("/api/item", ItemController.getAllItem);

export { apiRouter };
