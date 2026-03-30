import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { errorHandler } from "./middleware/error-handler";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../public")));
  app.enable("strict routing");

  const apiRoot = "/api/v1";
  app.use(apiRoot, authRouter);
  app.use(apiRoot, usersRouter);
  app.use(errorHandler);

  return app;
}
