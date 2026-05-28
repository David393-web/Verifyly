import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/Users.js";
import Notification from "../models/Notification.js";

import { sendEmail } from "../utils/sendEmail.js";


// ==============================
// REGISTER
// ==============================
export const register = async (
  req,
  res
) => {

  try {

    const {
      full_name,
      email,
      password,
    } = req.body;

    // VALIDATION
    if (
      !full_name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All fields are required",

      });

    }

    // CHECK EXISTING USER
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER
    const user =
      await User.create({

        full_name,

        email,

        password:
          hashedPassword,

      });

    // CREATE NOTIFICATION
    await Notification.create({

      user:
        user._id,

      title:
        "Welcome to Verilyfy",

      message:
        "Your account was created successfully.",

      type:
        "account",

    });

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id:
          user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          "7d",
      }

    );

    // SEND EMAIL
    try {

      await sendEmail({

        to:
          email,

        subject:
          "Welcome to Verilyfy 🛡️",

        html: `
          <div style="
            font-family:sans-serif;
            padding:20px;
            background:#f9fafb;
          ">

            <h1 style="
              color:#4f46e5;
            ">
              Welcome to Verilyfy 🛡️
            </h1>

            <p>
              Hello ${full_name},
            </p>

            <p>
              Your account has been created successfully.
            </p>

            <p>
              You can now securely report scam activities and track investigations in real-time.
            </p>

            <div style="
              margin-top:20px;
              padding:15px;
              background:#eef2ff;
              border-radius:10px;
            ">

              <strong>
                Security Tips:
              </strong>

              <ul>
                <li>
                  Never share your OTP
                </li>

                <li>
                  Avoid suspicious links
                </li>

                <li>
                  Report scam activity immediately
                </li>
              </ul>

            </div>

            <p style="
              margin-top:20px;
            ">
              Stay protected,
            </p>

            <strong>
              Verilyfy Security Team
            </strong>

          </div>
        `,

      });

    } catch (emailError) {

      console.log(
        "EMAIL ERROR:",
        emailError.message
      );

    }

    // SUCCESS RESPONSE
    return res.status(201).json({

      success: true,

      message:
        "Registration successful",

      token,

      user: {

        id:
          user._id,

        full_name:
          user.full_name,

        email:
          user.email,

        role:
          user.role,

      },

    });

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Registration failed",

    });

  }

};


// ==============================
// LOGIN
// ==============================
export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    // VALIDATION
    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required",

      });

    }

    // FIND USER
    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid credentials",

      });

    }

    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid credentials",

      });

    }

    // CREATE LOGIN NOTIFICATION
    await Notification.create({

      user:
        user._id,

      title:
        "Login Successful",

      message:
        "You logged into your account.",

      type:
        "login",

    });

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id:
          user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn:
          "7d",
      }

    );

    // SUCCESS RESPONSE
    return res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id:
          user._id,

        full_name:
          user.full_name,

        email:
          user.email,

        role:
          user.role,

      },

    });

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message:
        "Login failed",

    });

  }

}; 