import nodemailer from "nodemailer";

const email = process.env.NEXT_GOOGLE_EMAIL;
const pass = process.env.NEXT_GOOGLE_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};