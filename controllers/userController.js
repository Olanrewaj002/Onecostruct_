import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret";

export const registerUser = async (req, res) => {
  const { email, password, isAdmin } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email, password: hashedPassword, isAdmin });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(400).json({ message: "Error registering user.", error });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        console.log('Login attempt for email:', email); // Debug log
        
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No'); // Debug log
        
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        console.log('Password match:', isMatch); // Debug log

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Store user info in session
        req.session.user = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        };

        console.log('Session created:', req.session.user); // Debug log

        res.status(200).json({ 
            message: "Login successful",
            user: {
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Login error:', error); // Detailed error logging
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid"); 
    res.redirect("/login.html");
  });
};



