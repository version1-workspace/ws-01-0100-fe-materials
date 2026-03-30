import path from "path";
import { createApp } from "./app";
import { prisma } from "./models/prisma";

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

console.log("public directory:", path.join(__dirname, "../public"));

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
