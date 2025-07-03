require('dotenv').config();
const { Router } = require("express");
const Login = Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


Login.post("/", async (req: any, res: any) => {
  
  const { email, password } = req.body;
  try {
    const user = await client.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log(`User found: ${user.email}, Verified: ${user.isVerified}`);
    if (!user.isVerified) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret");
      return res.status(403).json({ message: "Email not verified", token });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret");
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = Login;
