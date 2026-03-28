// src/index.ts
import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

console.log("public directory:", path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../public")));
app.enable("strict routing");

const apiRoot = (path: string) => `/api/v1/${path}`;

app.get(apiRoot("/spec"), (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});

app
  .listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
