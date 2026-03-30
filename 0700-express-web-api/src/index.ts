// src/index.ts
import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import path from "path";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { prisma } from "./lib/prisma";

const app = express();
const port = Number(process.env.PORT ?? 3000);

console.log("public directory:", path.join(__dirname, "../public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.enable("strict routing");

const apiRoot = (path: string) => `/api/v1/${path}`;

app.get(apiRoot("/spec"), (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});

app.use("/api/v1", authRouter);
app.use("/api/v1", usersRouter);

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
