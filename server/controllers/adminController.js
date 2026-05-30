import Report from "../models/Report.js";

import Notification from "../models/Notification.js";

import User from "../models/Users.js";

import { sendEmail } from "../utils/sendEmail.js";


// GET ALL REPORTS
export const getAllReports =
  async (req, res) => {

    try {

      const reports =
        await Report.find()
          .populate(
            "user",
            "full_name email"
          )
          .sort({
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
        ).populate("user");

      if (!report) {

        return res.status(404).json({
          message:
            "Report not found",
        });

      }

      report.status =
        status;

      await report.save();


      // CREATE NOTIFICATION
      await Notification.create({

        user:
          report.user._id,

        title:
          "Report Status Updated",

        message:
          `Your ${report.scam_type} case is now ${status}.`,

        type:
          "status",

      });


      // SEND EMAIL
      await sendEmail({

        to:
          report.user.email,

        subject:
          "Case Status Updated 🔔",

        html: `
          <div style="
            font-family:sans-serif;
            padding:20px;
            background:#f9fafb;
          ">

            <h1 style="
              color:#4f46e5;
            ">
              Case Status Updated 🔔
            </h1>

            <p>
              Hello ${report.user.full_name},
            </p>

            <p>
              Your submitted scam report has been updated.
            </p>

            <div style="
              margin-top:20px;
              padding:15px;
              background:#eef2ff;
              border-radius:10px;
            ">

              <p>
                <strong>
                  Scam Type:
                </strong>

                ${report.scam_type}
              </p>

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
              Thank you for helping fight online fraud.
            </p>

            <strong>
              Verilyfy Investigation Team
            </strong>

          </div>
        `,

      });

      res.status(200).json(
        report
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };