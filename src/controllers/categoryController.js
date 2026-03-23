import Category from "../models/categoryModel.js";

// Create a new category
export const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await Category.create({ name, user: req.user._id });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories for the authenticated user
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { name },
            { new: true }
        );  
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category    
export const deleteCategory = async (req, res) => {
    const { id } = req.params;  
    try {
        const category = await Category.findOneAndDelete({ _id: id, user: req.user._id });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

