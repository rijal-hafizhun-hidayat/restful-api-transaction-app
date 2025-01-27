import express from "express";
import { CustomerController } from "../controller/customer-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthController } from "../controller/auth-controller";
import { RoleController } from "../controller/role-controller";

const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.post("/api/logout", AuthController.logout);
apiRouter.get("/api/current-user", AuthController.currentUser);

apiRouter.get("/api/transaction", TransactionController.getAllTransaction);
apiRouter.post("/api/transaction", TransactionController.storeTransaction);
apiRouter.get(
  "/api/transaction/code",
  TransactionController.getCodeTransaction
);
apiRouter.delete(
  "/api/transaction/:transactionId",
  TransactionController.destroyTransactionByTransactionId
);
apiRouter.get(
  "/api/transaction/:transactionId",
  TransactionController.getTransactionByTransactionId
);
apiRouter.put(
  "/api/transaction/:transactionId",
  TransactionController.updateTransactionByTransactionId
);

apiRouter.get("/api/customer", CustomerController.getAllCostumer);
apiRouter.get("/api/customer/code", CustomerController.generateCustomerCode);

apiRouter.get("/api/item", ItemController.getAllItem);

apiRouter.get("/api/role", RoleController.getAllRoles);

export { apiRouter };
