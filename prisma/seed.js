const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "fanny@budapestbitcoin.com";
  const adminPlainPassword = "BTC-BudaPest36.985";
  const saltRounds = 10;

  // Jelszó hash-elése
  const hashedPassword = await bcrypt.hash(adminPlainPassword, saltRounds);

  // Admin létrehozása (ha még nem létezik)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });

    console.log("✅ Admin user created:", admin);
  } else {
    console.log("⚠️ Admin user already exists.");
  }
}

main()
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
