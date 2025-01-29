import { PrismaClient } from "@prisma/client";

let prisma;

if (global.prismaGlobal) {
  prisma = global.prismaGlobal;
} else {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;
}

export default prisma;
