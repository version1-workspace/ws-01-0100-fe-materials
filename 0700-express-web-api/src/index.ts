// src/index.ts
import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import path from "path";
import { errorHandler } from "./middleware/error-handler";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { prisma } from "./models/prisma";

const app = express();
const port = Number(process.env.PORT ?? 3000);

console.log("public directory:", path.join(__dirname, "../public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.enable("strict routing");

const apiRoot = "/api/v1";
app.use(apiRoot, authRouter);
app.use(apiRoot, usersRouter);
app.use(errorHandler);

app
  .listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
