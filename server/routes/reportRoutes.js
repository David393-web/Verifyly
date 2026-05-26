import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createReport,
  getReports,
  getReportStats,
} from "../controllers/reportController.js";

import upload from "../config/cloudinary.js";

const router = express.Router();


// CREATE REPORT
router.post(
  "/",
  authMiddleware,

  upload.fields([
    {
      name: "screenshots",
      maxCount: 10,
    },
    {
      name: "receipt",
      maxCount: 10,
    },
  ]),

  createReport
);


// GET USER REPORTS
router.get(
  "/",
  authMiddleware,
  getReports
);


// GET REPORT STATS
router.get(
  "/stats",
  authMiddleware,
  getReportStats
);

export default router;