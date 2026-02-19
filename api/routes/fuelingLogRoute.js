const express = require("express");
const router = express.Router();

const { createFuelingLog, getFuelingLogsByUser } = require("../controller/fuelingLogController");

router.post("/", createFuelingLog);

// שים לב לשם!
router.get("/:firebaseUid", getFuelingLogsByUser);

module.exports = router;
