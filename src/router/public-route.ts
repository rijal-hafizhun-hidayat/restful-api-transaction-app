import express from "express";
import { AuthController } from "../controller/auth-controller";

const publicRoute = express.Router();

publicRoute.post("/api/login", AuthController.login);

export { publicRoute };
