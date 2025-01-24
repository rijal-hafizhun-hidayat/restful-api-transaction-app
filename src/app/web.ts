import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api-route";

const web = express();

web.use(express.json());
web.use(apiRouter);
web.use(errorMiddleware);

export { web };
