import express from "express";
import { CustomerController } from "../controller/customer-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";

const apiRouter = express.Router();

apiRouter.get("/api/transaction", TransactionController.getAllTransaction);
apiRouter.post("/api/transaction", TransactionController.storeTransaction);
apiRouter.get(
  "/api/transaction/code",
  TransactionController.getCodeTransaction
);

apiRouter.get("/api/customer", CustomerController.getAllCostumer);
apiRouter.get("/api/customer/code", CustomerController.generateCustomerCode);

apiRouter.get("/api/item", ItemController.getAllItem);

export { apiRouter };
