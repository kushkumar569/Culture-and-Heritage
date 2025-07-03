require('dotenv').config();
import { Request, Response } from "express";
const { Router } = require("express");
const verifyEmail = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const jwt = require("jsonwebtoken");

verifyEmail.get("/", async (req: Request, res: Response) => {
  const { token } = req.query;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    console.log(decoded);
    const user = await client.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });

    res.status(200).send("Email verified successfully!");
  } catch (err) {
    res.status(400).send("Invalid or expired token.");
  }
});

module.exports = verifyEmail;
