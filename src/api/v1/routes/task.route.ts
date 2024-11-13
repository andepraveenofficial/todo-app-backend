// task.route.ts
import express from 'express';
import { taskController } from '../controllers';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = express.Router();

// Routes for tasks
router.post('/', authMiddleware, taskController.createTask);
router.get('/', authMiddleware, taskController.getTasks);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;
