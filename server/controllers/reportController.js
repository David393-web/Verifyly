import Report from "../models/Report.js";
import User from "../models/Users.js";
import Notification from "../models/Notification.js";

import { sendEmail } from "../utils/sendEmail.js";


// CREATE REPORT
export const createReport = async (
  req,
  res
) => {

  try {

    const {
      scam_type,
      amount_lost,
      description,
      contact_email,
    } = req.body;


    // FILES
    const screenshots =
      req.files?.screenshots
        ?.map(
          (file) => file.path
        ) || [];

    const receipt =
      req.files?.receipt?.[0]
        ?.path || "";


    // CREATE REPORT
    const report =
      await Report.create({

        user: req.user.id,

        scam_type,

        amount_lost,

        description,

        contact_email,

        screenshots,

        receipt,

      });


    // GET USER
    const userData =
      await User.findById(
        req.user.id
      );


    // CREATE NOTIFICATION
    await Notification.create({

      user: req.user.id,

      title:
        "Scam Report Submitted",

      message:
        `${scam_type} report submitted successfully.`,

      type:
        "report",

      read: false,

    });


    // SEND EMAIL
    await sendEmail({

      to: userData.email,

      subject:
        "Scam Report Submitted 🚨",

      html: `
        <div style="
          font-family:sans-serif;
          padding:20px;
          background:#f9fafb;
        ">

          <h1 style="
            color:#dc2626;
          ">
            Scam Report Submitted 🚨
          </h1>

          <p>
            Hello ${userData.full_name},
          </p>

          <p>
            Your report has been submitted successfully and is currently under review.
          </p>

          <div style="
            margin-top:20px;
            padding:15px;
            background:#fef2f2;
            border-radius:10px;
          ">

            <p>
              <strong>
                Scam Type:
              </strong>

              ${scam_type}
            </p>

            <p>
              <strong>
                Amount Lost:
              </strong>

              ₦${Number(amount_lost).toLocaleString()}
            </p>

            <p>
              <strong>
                Status:
              </strong>

              Pending Review
            </p>

            <p>
              <strong>
                Submitted:
              </strong>

              ${new Date().toLocaleString()}
            </p>

          </div>

          <p style="
            margin-top:20px;
          ">
            Our investigation team will carefully review your case and update you on any progress.
          </p>

          <p>
            Thank you for helping fight online fraud.
          </p>

          <strong>
            Verilyfy Investigation Team
          </strong>

        </div>
      `,

    });


    // RESPONSE
    res.status(201).json(report);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};


// UPDATE REPORT STATUS
export const updateReportStatus =
  async (req, res) => {

    try {

      const {
        status,
      } = req.body;

      const report =
        await Report.findById(
          req.params.id
        );

      if (!report) {

        return res.status(404).json({
          message:
            "Report not found",
        });

      }

      // UPDATE STATUS
      report.status = status;

      await report.save();

      // GET USER
      const userData =
        await User.findById(
          report.user
        );

      // CREATE NOTIFICATION
      await Notification.create({

        user: report.user,

        title:
          "Report Status Updated",

        message:
          `Your report status changed to ${status}.`,

        type:
          "status",

        read: false,

      });

      // SEND EMAIL
      await sendEmail({

        to: userData.email,

        subject:
          `Report Status Updated - ${status}`,

        html: `
          <div style="
            font-family:sans-serif;
            padding:20px;
            background:#f9fafb;
          ">

            <h1 style="
              color:#4f46e5;
            ">
              Report Status Updated
            </h1>

            <p>
              Hello ${userData.full_name},
            </p>

            <p>
              Your scam report status has been updated.
            </p>

            <div style="
              margin-top:20px;
              padding:15px;
              background:#eef2ff;
              border-radius:10px;
            ">

              <p>
                <strong>
                  New Status:
                </strong>

                ${status}
              </p>

            </div>

            <p style="
              margin-top:20px;
            ">
              Thank you for using Verilyfy.
            </p>

            <strong>
              Verilyfy Investigation Team
            </strong>

          </div>
        `,

      });

      res.status(200).json({

        message:
          "Report status updated successfully",

        report,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// GET USER REPORTS
export const getReports = async (
  req,
  res
) => {

  try {

    const reports =
      await Report.find({
        user: req.user.id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json(
      reports
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};


// GET REPORT STATS
export const getReportStats =
  async (req, res) => {

    try {

      const totalReports =
        await Report.countDocuments({
          user: req.user.id,
        });

      const pendingReports =
        await Report.countDocuments({
          user: req.user.id,
          status: "Pending",
        });

      const investigatingReports =
        await Report.countDocuments({
          user: req.user.id,
          status: "Investigating",
        });

      const resolvedReports =
        await Report.countDocuments({
          user: req.user.id,
          status: "Resolved",
        });

      const latestReport =
        await Report.findOne({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({

        totalReports,

        pendingReports,

        investigatingReports,

        resolvedReports,

        latestReport,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };