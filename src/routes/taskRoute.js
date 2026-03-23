import express from "express";
import { createTask, getTasks, updateTask, deleteTask, getTaskById, toggleTaskCompletion } from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import { getTaskStatistics, getThisWeekTasks, getOverdueTasks, getTodayTasks } from "../controllers/taskStatisticsController.js";


const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);
router.get('/:id', protect, getTaskById);
router.patch('/:id/toggle', protect, toggleTaskCompletion);
router.get('/stats', protect, getTaskStatistics);
router.get('/overdue', protect, getOverdueTasks);
router.get('/today', protect, getTodayTasks);
router.get('/this-week', protect, getThisWeekTasks);

export default router;