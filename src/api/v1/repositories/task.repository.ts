// task.repository.ts
import prisma from '../../../config/prisma';
import { TaskModel } from '../models';

export const createTask = async (
  userId: string,
  title: string,
  description: string,
): Promise<TaskModel> => {
  return await prisma.task.create({
    data: {
      title,
      description,
      userId, // Assign the task to the user by their ID
      status: 'pending', // Default status
    },
  });
};

export const getTasksByUserId = async (
  userId: string,
): Promise<TaskModel[]> => {
  return await prisma.task.findMany({
    where: {
      userId, // Fetch tasks for the given user
    },
  });
};

export const getTaskById = async (
  taskId: string,
  userId: string,
): Promise<TaskModel | null> => {
  return await prisma.task.findFirst({
    where: {
      id: taskId,
      userId, // Ensure the task belongs to the user
    },
  });
};

export const updateTask = async (
  taskId: string,
  userId: string,
  updates: Partial<TaskModel>,
): Promise<TaskModel> => {
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: updates,
  });
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};
