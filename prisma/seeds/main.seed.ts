// main.seed.ts
import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedTasks } from './task.seed';

const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log('Seeding started...');
    await seedUsers(); // Seed users first
    await seedTasks(); // Seed tasks after users
    console.log('Users and Tasks seeded successfully');
  } catch (e) {
    console.error('Error during seeding:', e);
    process.exit(1); // Exit with failure code
  } finally {
    console.log('Seeding completed!');
    await prisma.$disconnect(); // Disconnect from the database
    process.exit(0); // Exit with success code
  }
};

main().catch((e) => {
  console.error(e);
  process.exit(1); // Exit with failure code
});
