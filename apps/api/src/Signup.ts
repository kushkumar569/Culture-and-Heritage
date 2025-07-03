require('dotenv').config();
import { Request, Response } from "express";
const { Router } = require("express");
const Signup = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { z } = require("zod");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

Signup.post("/", async (req: Request, res: Response) => {
    const requireBody = z.object({
        email: z.string().min(3).max(30).email(),
        password: z.string().min(8).max(30),
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }
    try {
        const existingUser = await client.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
            data: { name, email, password: hashedPassword, isGuide: false, isTourist: true, isVendor: false, isVlogger: false, isVerified: false },
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret")

        const url = `${process.env.BASE_URL}/auth/VerifyEmail?token=${token}`;


        // console.log(url);
        const mail = await transporter.sendMail({
            to: email,
            subject: "Verify your email",
            html: `Hello ${name},<br><br>Please click the link below to verify your email:<br><a href="${url}">${url}</a><br><br>This link will expire in 24 hours.`,
        });

        if (!mail) {
            return res.status(500).json({ message: "Failed to send verification email" });
        }
        // console.log("Email sent successfully");
        // console.log(`Verification email sent to ${email}`);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


Signup.get("/check-verification", async (req: any, res: any) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization token missing", verified: false });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

        const userId = typeof decoded === "object" && "userId" in decoded ? decoded.userId : null;
        if (!userId) return res.status(400).json({ message: "Invalid token payload", verified: false });

        const user = await client.user.findUnique({
            where: { id: userId },
        });

        if (!user) return res.status(404).json({ message: "User not found", verified: false });

        return res.json({ verified: user.isVerified });
    } catch (err) {
        console.error("Verification check error:", err);
        return res.status(401).json({ message: "Invalid or expired token", verified: false });
    }
});


module.exports = Signup;
