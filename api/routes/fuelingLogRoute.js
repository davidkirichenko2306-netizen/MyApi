const express = require("express");
const router = express.Router();

const {
    createFuelingLog,
    deleteFuelingLog,
    getFuelingLogsByUser,
    updateFuelingLog,
    getCheapestFuelingPerUser,
    getLatestCheapestFueling
} = require("../controller/fuelingLogController");

const {
    syncUser,
    getMe
} = require("../controller/userController");

const verifyFirebaseToken = require("../middleware");


// =========================
// 🌍 PUBLIC ROUTES (NO AUTH)
// =========================
router.get("/logs/latest-cheapest", getLatestCheapestFueling);


// =========================
// 👤 USER ROUTES (AUTH)
// =========================
router.get("/users/me", verifyFirebaseToken, getMe);
router.post("/users/sync", verifyFirebaseToken, syncUser);


// =========================
// ⛽ FUELING LOGS (AUTH)
// =========================
router.post("/logs", verifyFirebaseToken, createFuelingLog);

router.get("/logs", verifyFirebaseToken, getFuelingLogsByUser);

router.delete("/logs/:logId", verifyFirebaseToken, deleteFuelingLog);

router.put("/logs/:logId", verifyFirebaseToken, updateFuelingLog);

router.get("/logs/cheapest-per-user", verifyFirebaseToken, getCheapestFuelingPerUser);


module.exports = router;