import express from 'express';
import authRoutes from './auth.route';
import taskRoutes from './task.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/task', taskRoutes);

export default router;
