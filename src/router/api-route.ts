import express from "express";
import { CustomerController } from "../controller/customer-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { AuthController } from "../controller/auth-controller";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";

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
apiRouter.post("/api/customer", CustomerController.storeCustomer);
apiRouter.get("/api/customer/code", CustomerController.generateCustomerCode);
apiRouter.delete(
  "/api/customer/:customerId",
  CustomerController.destroyCustomerByCostumerId
);
apiRouter.get(
  "/api/customer/:customerId",
  CustomerController.getCustomerByCostumerId
);
apiRouter.put(
  "/api/customer/:customerId",
  CustomerController.updateCustomerByCostumerId
);

apiRouter.get("/api/item", ItemController.getAllItem);
apiRouter.post("/api/item", ItemController.storeItem);
apiRouter.get("/api/item/code", ItemController.generateItemCode);
apiRouter.delete("/api/item/:itemId", ItemController.destroyItemByItemId);
apiRouter.get("/api/item/:itemId", ItemController.getItemByItemId);
apiRouter.put("/api/item/:itemId", ItemController.updateItemByItemId);

apiRouter.get("/api/role", RoleController.getAllRoles);
apiRouter.post("/api/role", RoleController.storeRole);
apiRouter.delete("/api/role/:roleId", RoleController.destroyRoleByRoleId);
apiRouter.get("/api/role/:roleId", RoleController.getRoleByRoleId);
apiRouter.put("/api/role/:roleId", RoleController.updateRoleByRoleId);

apiRouter.get("/api/user", UserController.getAllUsers);
apiRouter.post("/api/user", UserController.storeUser);
apiRouter.delete("/api/user/:userId", UserController.destroyUserByUserId);
apiRouter.get("/api/user/:userId", UserController.getUserByUserId);
apiRouter.put("/api/user/:userId", UserController.updateUserByUserId);

export { apiRouter };
