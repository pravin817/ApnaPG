const User = require("../models/user.model");

// Middleware to verify admin role
const verifyAdmin = async (req, res, next) => {
  try {
    const userId = req.user;

    const user = await User.findById(userId);

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. You are not authorized to access this page",
        success: false,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Access denied.",
      success: false,
      error,
    });
  }
};

module.exports = verifyAdmin;
