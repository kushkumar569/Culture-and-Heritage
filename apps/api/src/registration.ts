import e from "express";

require('dotenv').config();
const { Router } = require("express");
const Registration = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

Registration.post("/guide", async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const registration = await client.user.update({
      where: { id: userId },
      data: {
        isGuide: true,
      },
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Registration.post("/vlogger", async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const registration = await client.user.update({
      where: { id: userId },
      data: {
        isVlogger: true,
      },
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Registration.post("/vendor", async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const registration = await client.user.update({
      where: { id: userId },
      data: {
        isVendor: true,
      },
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Registration.post("/tourist", async (req: any, res: any) => {
  const { userId } = req.body;
  console.log("Received userId for tourist registration:", userId);
  
  try {
    const registration = await client.user.update({
      where: { id: userId },
      data: {
        isTourist: true,
      },
    });
    res.status(201).json(registration);
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = Registration;
export {};