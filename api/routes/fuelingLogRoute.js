const express = require("express");
const router = express.Router();

const {
    createFuelingLog,
    deleteFuelingLog,
    getFuelingLogsByUser,
     updateFuelingLog,
        getCheapestFuelingPerUser , 
        getLatestCheapestFueling 
} = require("../controller/fuelingLogController");

const {
    syncUser,
    getMe
} = require("../controller/userController");

const verifyFirebaseToken = require("../middleware");

router.get("/logs/latest-cheapest", getLatestCheapestFueling);


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
// עדכון תדלוק (מאובטח לפי בעלות)
router.put("/logs/:logId", verifyFirebaseToken, updateFuelingLog);


// קבלת התדלוק הכי זול לכל משתמש
router.get("/logs/cheapest-per-user", verifyFirebaseToken, getCheapestFuelingPerUser);

module.exports = router;