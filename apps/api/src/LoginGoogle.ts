require("dotenv").config();
import { Request, Response } from "express";
const { Request, Response } = require("express");
const { Router } = require("express");
const googleLogin = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

googleLogin.post("/", async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Check if user exists
        const existingUser = await client.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return user data
        return res.status(200).json({ message: "User found", user: existingUser });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = googleLogin;