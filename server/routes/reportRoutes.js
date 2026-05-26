import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createReport,
  getReports,
  getReportStats,
  updateReportStatus,
} from "../controllers/reportController.js";

const router = express.Router();

// CREATE REPORT
router.post(
  "/",

  authMiddleware,

  upload.fields([
    {
      name: "screenshots",
      maxCount: 5,
    },

    {
      name: "receipt",
      maxCount: 1,
    },
  ]),

  createReport
);

// GET USER REPORTS
router.get("/", authMiddleware, getReports);

// GET REPORT STATS
router.get("/stats", authMiddleware, getReportStats);

// UPDATE REPORT STATUS
router.put("/:id/status", authMiddleware, updateReportStatus);

export default router;
