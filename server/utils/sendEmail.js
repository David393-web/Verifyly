import nodemailer from "nodemailer";

export const sendEmail = async ({
to,
subject,
html,
}) => {

// DISABLE EMAIL TEMPORARILY
// TO AVOID RENDER TIMEOUTS

console.log("EMAIL DISABLED");
return true;

};
