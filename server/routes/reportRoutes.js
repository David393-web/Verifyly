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

  (req, res, next) => {
    upload.fields([
      {
        name: "screenshots",
        maxCount: 10,
      },
      {
        name: "receipt",
        maxCount: 10,
      },
    ])(req, res, (err) => {
      if (err) {
        console.error("UPLOAD ERROR:");
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });
  },

  createReport,
);

// GET USER REPORTS
router.get("/", authMiddleware, getReports);

// GET REPORT STATS
router.get("/stats", authMiddleware, getReportStats);

export default router;
