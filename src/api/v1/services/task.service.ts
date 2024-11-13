import { taskRepository } from '../repositories';
import { CreateTaskDto, UpdateTaskDto } from '../dtos';

// Create Task
export const createTask = async (
  userId: string | undefined,
  taskData: CreateTaskDto,
) => {
  // Ensure that the task has a valid userId and title/description
  if (!userId) {
    throw new Error('User ID is required to create a task');
  }
  const task = await taskRepository.createTask(
    userId,
    taskData.title,
    taskData.description,
  );
  return task;
};

// Get Tasks by User ID
export const getTasks = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error('User ID is required to get tasks');
  }
  return await taskRepository.getTasksByUserId(userId);
};

// Update Task
export const updateTask = async (
  taskId: string,
  userId: string | undefined,
  updates: UpdateTaskDto,
) => {
  if (!userId) {
    throw new Error('User ID is required to update a task');
  }
  const updatedTask = await taskRepository.updateTask(taskId, userId, updates);
  return updatedTask;
};

// Delete Task
export const deleteTask = async (
  taskId: string,
  userId: string | undefined,
) => {
  if (!userId) {
    throw new Error('User ID is required to delete a task');
  }
  await taskRepository.deleteTask(taskId);
};
