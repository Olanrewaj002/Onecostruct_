import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import clientRoutes from "./routes/client.js";
import propertyRoutes from "./routes/property.js";
import contactRoutes from "./routes/contact.js";
import { isAdmin, isAuthenticated } from "./middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false, 
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true, 
      maxAge: 3600000, 
    },
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protected admin routes - Must come BEFORE static middleware
app.use("/admin-*", isAuthenticated, isAdmin, (req, res, next) => {
  if (!req.session.user?.isAdmin) {
    return res.redirect("/login.html");
  }
  next();
});

// Serve static files - Now comes after protection middleware
app.use(express.static("public"));

// Serve uploaded files - Protected
app.use(
  "/uploads",
  isAuthenticated,
  express.static(path.join(__dirname, "uploads"))
);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// API Routes
app.use("/api", userRoutes);
app.use("/api", clientRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api", contactRoutes);

// Main routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin-dashboard", isAuthenticated, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin-dashboard.html"));
});

// Serve the registration page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
