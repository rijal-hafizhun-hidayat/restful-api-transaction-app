import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express();

web.use(express.json());
web.use(errorMiddleware);

export { web };
