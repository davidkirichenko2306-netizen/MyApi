require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// 🔥 Firebase Admin
const admin = require("firebase-admin");

// Decode Base64 service account
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_BASE64, "base64").toString("utf8")
);

// Init Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uri = process.env.MONGO_STR;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const FuelingLogRouter = require("./api/routes/fuelingLogRoute");
app.use("/logs", FuelingLogRouter);

module.exports = app;