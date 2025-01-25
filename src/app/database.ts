import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("error", (e: Prisma.LogEvent) => {
  console.error(`[ERROR]: ${e.message}`);
});

prisma.$on("warn", (e: Prisma.LogEvent) => {
  console.warn(`[WARN]: ${e.message}`);
});

prisma.$on("info", (e: Prisma.LogEvent) => {
  console.info(`[INFO]: ${e.message}`);
});

prisma.$on("query", (e: Prisma.QueryEvent) => {
  console.info(
    `[QUERY]: ${e.query} | Params: ${e.params} | Duration: ${e.duration}ms`
  );
});
