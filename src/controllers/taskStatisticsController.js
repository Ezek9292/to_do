export const getTaskStatistics = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments({ user: req.user._id });
        const completedTasks = await Task.countDocuments({ user: req.user._id, completed: true });
        const pendingTasks = totalTasks - completedTasks;

        res.status(200).json({
            totalTasks,
            completedTasks,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get overdue tasks
export const getOverdueTasks = async (req, res) => {
    try {
        const now = new Date();
        const overdueTasks = await Task.find({ 
            user: req.user._id,
            deadline: { $lt: now },
            completed: false
        });
        res.status(200).json(overdueTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get tasks due today
export const getTodayTasks = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const todayTasks = await Task.find({
            user: req.user._id,
            deadline: { $gte: startOfDay, $lte: endOfDay },
            completed: false
        });
        res.status(200).json(todayTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get tasks due this week
export const getThisWeekTasks = async (req, res) => {
    try {
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const thisWeekTasks = await Task.find({
            user: req.user._id,
            deadline: { $gte: startOfWeek, $lte: endOfWeek },
            completed: false
        });
        res.status(200).json(thisWeekTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
