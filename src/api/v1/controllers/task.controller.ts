import { Response } from 'express';
import { taskService } from '../services';
import { CreateTaskDto, UpdateTaskDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import asyncHandler from '../../../handlers/async.handler';
import { AuthRequest } from '../../../middlewares/auth.middleware';

// Create Task
export const createTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;
    const taskData: CreateTaskDto = req.body;

    // Call the task service to create the task
    const newTask = await taskService.createTask(userId, taskData);

    // Respond with a success message and the newly created task
    new ApiResponse(res, 201, 'Task created successfully', newTask);
  },
);

// Get All Tasks for the Authenticated User
export const getTasks = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId;

    // Fetch tasks for the authenticated user
    const tasks = await taskService.getTasks(userId);

    // Respond with a success message and the list of tasks
    new ApiResponse(res, 200, 'Tasks retrieved successfully', tasks);
  },
);

// Update Task
export const updateTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateTaskDto = req.body;
    const userId = req.user?.userId;

    // Call the task service to update the task
    const updatedTask = await taskService.updateTask(id, userId, updateData);

    // Respond with a success message and the updated task
    new ApiResponse(res, 200, 'Task updated successfully', updatedTask);
  },
);

// Delete Task
export const deleteTask = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Call the task service to delete the task
    await taskService.deleteTask(id, userId);

    // Respond with a success message
    new ApiResponse(res, 200, 'Task deleted successfully', null);
  },
);
