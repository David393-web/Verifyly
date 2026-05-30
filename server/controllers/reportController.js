import Report from "../models/Report.js";
import Notification from "../models/Notification.js";

// =====================================
// CREATE REPORT
// =====================================
export const createReport = async (req, res) => {
  try {
    const { scam_type, amount_lost, description, contact_email } = req.body;

    // FILES
    const screenshots = req.files?.screenshots?.map((file) => file.path) || [];

    const receipt = req.files?.receipt?.[0]?.path || "";

    // CREATE REPORT
    const report = await Report.create({
      user: req.user.id,

      scam_type,

      amount_lost,

      description,

      contact_email,

      screenshots,

      receipt,
    });

    // CREATE NOTIFICATION
    await Notification.create({
      user: req.user.id,

      title: "Scam Report Submitted",

      message: `${scam_type} report submitted successfully.`,

      type: "report",

      read: false,
    });

    // RESPONSE
    return res.status(201).json({
      success: true,

      message: "Report submitted successfully",

      report,
    });
  } catch (error) {
    console.error("=================================");
    console.error("CREATE REPORT ERROR");
    console.error("=================================");

    console.error("MESSAGE:", error?.message);

    console.error("STACK:", error?.stack);

    console.error("BODY:", JSON.stringify(req.body, null, 2));

    console.error("FILES:", JSON.stringify(req.files, null, 2));

    console.error("FULL ERROR:", JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      message: error?.message || "Submission failed",
    });
  }
};

// =====================================
// UPDATE REPORT STATUS
// =====================================
export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,

        message: "Report not found",
      });
    }

    // UPDATE STATUS
    report.status = status;

    await report.save();

    // CREATE NOTIFICATION
    await Notification.create({
      user: report.user,

      title: "Report Status Updated",

      message: `Your report status changed to ${status}.`,

      type: "status",

      read: false,
    });

    return res.status(200).json({
      success: true,

      message: "Report status updated successfully",

      report,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:");

    console.error(error);

    console.error(error?.message);

    console.error(error?.stack);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to update report",
    });
  }
};

// =====================================
// GET USER REPORTS
// =====================================
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(reports);
  } catch (error) {
    console.log("GET REPORTS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch reports",
    });
  }
};

// =====================================
// GET REPORT STATS
// =====================================
export const getReportStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments({
      user: req.user.id,
    });

    const pendingReports = await Report.countDocuments({
      user: req.user.id,

      status: "Pending",
    });

    const investigatingReports = await Report.countDocuments({
      user: req.user.id,

      status: "Investigating",
    });

    const resolvedReports = await Report.countDocuments({
      user: req.user.id,

      status: "Resolved",
    });

    const latestReport = await Report.findOne({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      totalReports,

      pendingReports,

      investigatingReports,

      resolvedReports,

      latestReport,
    });
  } catch (error) {
    console.log("REPORT STATS ERROR:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to fetch stats",
    });
  }
};
