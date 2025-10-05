require('dotenv').config();
const { Router } = require("express");
const Login = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

Login.post("/", async (req: any, res: any) => {

  const { email, password } = req.body;
  try {
    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(`User found: ${user.email}, Verified: ${user.isVerified}`);
    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret");
    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

Login.post("/verifyEmail", async (req: any, res: any) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret");
    const url = `${process.env.BASE_URL}/auth/VerifyEmail?token=${token}`;

    // console.log(url);
    const mail = await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `Hello,<br><br>Please click the link below to verify your email:<br><a href="${url}">${url}</a><br><br>This link will expire in 24 hours.`,
    });

    if (!mail) {
      return res.status(500).json({ message: "Failed to send verification email" });
    }
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = Login;
export {};  // use this to prevent "Cannot redeclare block-scoped variable" error in VSCode