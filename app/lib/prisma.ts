import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type GlobalWithPrisma = typeof globalThis & {
  prisma: PrismaClient | undefined;
};

const prisma = (globalThis as GlobalWithPrisma).prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  (globalThis as GlobalWithPrisma).prisma = prisma;
}

export { prisma }; 