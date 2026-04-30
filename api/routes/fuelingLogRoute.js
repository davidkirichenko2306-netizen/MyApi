const express = require("express");
const router = express.Router();

const { createFuelingLog,deleteFuelingLog, getFuelingLogsByUser } = require("../controller/fuelingLogController");
const {getOrCreateUser } = require("../controller/userController");
const { getOrCreateUserFromBody } = require("../controller/userController");


const verifyFirebaseToken = require('../middleware');

// אם אתה שולח דרך URL
router.post("/", verifyFirebaseToken, createFuelingLog);

router.get("/:firebaseUid", verifyFirebaseToken, getFuelingLogsByUser);

router.post("/delete", verifyFirebaseToken, deleteFuelingLog);

router.get("/users/:firebaseUid", verifyFirebaseToken, getOrCreateUser);
router.post("/users/createOrUpdate", verifyFirebaseToken, getOrCreateUserFromBody);
module.exports = router;
