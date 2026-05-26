import express from "express";

import {
  getAllReports,
  updateReportStatus,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();


// GET ALL REPORTS
router.get(
  "/reports",
  authMiddleware,
  getAllReports
);


// UPDATE STATUS
router.put(
  "/reports/:id",
  authMiddleware,
  updateReportStatus
);


export default router;