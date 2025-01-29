import cors, { type CorsOptions } from "cors";
import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api-route";
import { publicRoute } from "../router/public-route";
import { adminRoute } from "../router/admin-route";

const web = express();

const whitelist: string[] = [`${process.env.BASE_URL_TRANSACTION_APP}`];
const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 200, // For legacy browser support
};

web.use(cors(corsOptions));
web.use(express.json());
web.use(publicRoute);
web.use(apiRouter);
web.use(adminRoute);
web.use(errorMiddleware);

export { web };
