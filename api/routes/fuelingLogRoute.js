const express = require("express");
const router = express.Router();

const {
    createFuelingLog,
    deleteFuelingLog,
    getFuelingLogsByUser
} = require("../controller/fuelingLogController");

const {
    syncUser,
    getMe
} = require("../controller/userController");

const verifyFirebaseToken = require("../middleware");


// =========================
// 👤 USER ROUTES
// =========================

// קבלת המשתמש המחובר
router.get("/users/me", verifyFirebaseToken, getMe);

// יצירה / עדכון משתמש (סנכרון)
router.post("/users/sync", verifyFirebaseToken, syncUser);


// =========================
// ⛽ FUELING LOG ROUTES
// =========================

// יצירת תדלוק
router.post("/logs", verifyFirebaseToken, createFuelingLog);

// קבלת כל התדלוקים של המשתמש המחובר
router.get("/logs", verifyFirebaseToken, getFuelingLogsByUser);

// מחיקת תדלוק (מאובטח לפי בעלות)
router.delete("/logs/:logId", verifyFirebaseToken, deleteFuelingLog);


module.exports = router;