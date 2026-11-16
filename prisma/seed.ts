import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { scryptSync, randomBytes } from "crypto";
import { config } from "dotenv";
config({ path: ".env.local" });
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  // ⭐ PrismaLibSQL → PrismaLibSql (жижиг "ql")
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL ?? "admin@bbd.mn";
  const password = process.env.ADMIN_PASSWORD ?? "Admin123!";

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "BBD Admin",
      password: hashPassword(password),
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin үүслээ: ${email} / ${password}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});