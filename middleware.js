import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-jwt-secret";

// Middleware to verify JWT
export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login.html");
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (!req.session.user?.isAdmin) {
    return res.redirect("/");
  }
  next();
};

