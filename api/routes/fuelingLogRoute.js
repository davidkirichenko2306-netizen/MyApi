const express = require("express");
const router = express.Router();

const { createFuelingLog,deleteFuelingLog, getFuelingLogsByUser } = require("../controller/fuelingLogController");
const {getOrCreateUser } = require("../controller/userController");

// אם אתה שולח דרך URL
router.get("/users/:firebaseUid",getOrCreateUser);
router.post("/delete",deleteFuelingLog);
router.post("/", createFuelingLog);

// שים לב לשם!
router.get("/:firebaseUid", getFuelingLogsByUser);

module.exports = router;
