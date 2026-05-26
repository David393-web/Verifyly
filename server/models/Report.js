import mongoose from "mongoose";

const reportSchema =
  new mongoose.Schema(

    {

      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      scam_type: {
        type: String,
        required: true,
      },

      amount_lost: {
        type: Number,
        default: 0,
      },

      description: {
        type: String,
        required: true,
      },

      contact_email: {
        type: String,
        required: true,
      },

      screenshots: [
        {
          type: String,
        },
      ],

      receipt: {
        type: String,
      },

      status: {
        type: String,

        enum: [
          "Pending",
          "Investigating",
          "Resolved",
        ],

        default: "Pending",
      },

    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Report",
  reportSchema
);