import express from "express";
import { RoleController } from "../controller/role-controller";
import { UserController } from "../controller/user-controller";
import { adminMiddleware } from "../middleware/admin-middleware";
import { authMiddleware } from "../middleware/auth-middleware";

const adminRoute = express.Router();

adminRoute.use(adminMiddleware);
adminRoute.get("/api/role", RoleController.getAllRoles);
adminRoute.post("/api/role", RoleController.storeRole);
adminRoute.delete("/api/role/:roleId", RoleController.destroyRoleByRoleId);
adminRoute.get("/api/role/:roleId", RoleController.getRoleByRoleId);
adminRoute.put("/api/role/:roleId", RoleController.updateRoleByRoleId);

adminRoute.get("/api/user", UserController.getAllUsers);
adminRoute.post("/api/user", UserController.storeUser);
adminRoute.delete("/api/user/:userId", UserController.destroyUserByUserId);
adminRoute.get("/api/user/:userId", UserController.getUserByUserId);
adminRoute.put("/api/user/:userId", UserController.updateUserByUserId);

export { adminRoute };
