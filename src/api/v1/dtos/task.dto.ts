// DTO for creating a task
export interface CreateTaskDto {
  title: string;
  description: string;
}

// DTO for updating a task
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'pending' | 'in progress' | 'done';
}

// DTO for fetching tasks (you may use query parameters, for example)
export interface GetTasksDto {
  userId: string; // The user ID to filter tasks
  status?: 'pending' | 'in progress' | 'done'; // Optional filter by status
  search?: string; // Optional search parameter for title/description
}

// DTO for deleting a task
export interface DeleteTaskDto {
  taskId: string;
}

// DTO for task status update (in case you want a specific status update without other changes)
export interface TaskStatusUpdateDto {
  status: 'pending' | 'in progress' | 'done';
}
