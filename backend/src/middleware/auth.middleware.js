const admin = require("../config/firebase");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    let user = await User.findOne({
      firebaseUID: decodedToken.uid,
    });

    // Auto create user if not exists
    if (!user) {
      user = await User.create({
        firebaseUID: decodedToken.uid,
        name: decodedToken.name || "User",
        email: decodedToken.email,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};
