const admin = require("firebase-admin");

// middleware.js
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.log("No auth header");
        return res.status(401).json({ message: "No token" });
    }
    
    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message); // זה יגיד לך למה השרת מחזיר 401
    return res.status(401).json({ message: "Invalid token", error: error.message });
  }
};

module.exports = verifyFirebaseToken;