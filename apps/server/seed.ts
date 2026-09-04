import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.store.upsert({
    where: { id: 'downtown' },
    update: {},
    create: {
      id: 'downtown',
      name: 'Downtown Tech Hub',
      address: '123 Main St',
      basePrice: 0.50,
    },
  });

  await prisma.store.upsert({
    where: { id: 'library' },
    update: {},
    create: {
      id: 'library',
      name: 'University Library Shop',
      address: '456 College Ave',
      basePrice: 0.30,
    },
  });

  console.log('Stores seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
