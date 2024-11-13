// task.seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedTasks = async () => {
  // Delete all existing tasks (optional, based on your needs)
  await prisma.task.deleteMany();

  // Fetch all users from the database
  const users = await prisma.user.findMany();

  // Check if users exist
  if (users.length === 0) {
    console.log('No users found to assign tasks.');
    return;
  }

  // Create some sample tasks for the users
  const tasks = [
    {
      userId: users[0].id, // Assign task to the first user
      title: 'Finish the project',
      description: 'Complete the final project for the course.',
      status: 'pending', // Default status
    },
    {
      userId: users[0].id, // Assign task to the first user
      title: 'Buy groceries',
      description: 'Get groceries for the week.',
      status: 'in progress',
    },
    {
      userId: users[1].id, // Assign task to the second user
      title: 'Prepare dinner',
      description: 'Cook dinner for the family.',
      status: 'done',
    },
    {
      userId: users[2].id, // Assign task to the third user
      title: 'Read a book',
      description: 'Finish reading the latest book on the shelf.',
      status: 'pending',
    },
  ];

  // Loop through the task array and create each task in the database
  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }

  console.log('Tasks seeded successfully');
};
