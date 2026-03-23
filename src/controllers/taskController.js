import Task from "../models/taskModel.js";

// Create a new task
export const createTask = async (req, res) => {
    const { title, description, category, deadline } = req.body;
    try {
        const task = await Task.create({
            title,
            description,
            category,
            deadline,
            user: req.user._id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
    try {
        const page = number(req.query.page) || 1;
        const limit = 5;

        const filter = {user:req.user._id};
        if(req.query.category) {
            filter.category = req.query.category;
        }
        //search
        if(req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
        }

        const tasks = (await Task.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('category', 'name'))
        .sort({ createdAt: -1 });
        res.status(200).json(tasks);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a single task
export const getTaskById = async (req, res) => {
    const { id } = req.params;  
    try {
        const task = await Task.findOne({ _id: id, user: req.user._id }).populate('category', 'name');
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

// Update a task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, category, deadline } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, description, completed, category, deadline },
            { new: true }
        ).populate('category', 'name');
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// toggle task completion status
export const toggleTaskCompletion = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ _id: id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.completed = !task.completed;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};