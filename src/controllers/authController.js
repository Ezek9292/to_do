import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7"
    })
}

// register user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate a token
        const token = generateToken(user._id);

        // Send the token and user info
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate a token
        const token = generateToken(user._id);
        // Send the token and user info
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

