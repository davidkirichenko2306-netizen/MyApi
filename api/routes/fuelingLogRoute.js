const express = require("express");
const router = express.Router();

const {createFuelingLog, getFuelingLogsByUser} = require("../controller/fuelingLogController");

// create fueling log for user
router.post("/", createFuelingLog);
router.get("/:firebase_uid", getFuelingLogsByUser);

module.exports = router;
