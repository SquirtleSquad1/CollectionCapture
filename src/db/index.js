import { PrismaClient } from "@prisma/client";

// implementing dependency injection for efficiency
let prisma;
export const db = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
