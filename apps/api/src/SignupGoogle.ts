require("dotenv").config();
import { Request, Response } from "express";
const { Request, Response } = require("express");
const { Router } = require("express");
const googleSignup = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const jwt = require("jsonwebtoken");

googleSignup.post("/", async (req: Request, res: Response) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Check if user already exists
        const existingUser = await client.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(200).json({ message: "User already exists", user: existingUser });
        }

        // Create new user
        const user = await client.user.create({
            data: {
                email,
                name,
                password: "",
                isGuide: false,
                isTourist: true,
                isVendor: false,
                isVlogger: false,
                isVerified: true, // Assuming Google sign-up means the user is verified
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret")

        return res.status(201).json({ token });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = googleSignup;
