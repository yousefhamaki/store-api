import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EmailGmail,
    pass: config.GmailPassword,
  },
});

export default transporter;
