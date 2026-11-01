import { buildApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./shared/prisma";

async function main(): Promise<void> {
  const app = buildApp();

  const shutdown = async (): Promise<void> => {
    await app.close();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown());
  process.on("SIGTERM", () => void shutdown());

  await app.listen({ port: env.PORT, host: "0.0.0.0" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
