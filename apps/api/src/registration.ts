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
  const { userId, bio, channelUrl, isActive } = req.body;
  try {
    const vloggerProfile = await client.VloggerProfile.create({
      data: {
        userId: userId,
        bio: bio,
        channelUrl: channelUrl,
        isActive: isActive,
      },
    }); 
    if (!vloggerProfile) {
      return res.status(500).json({ error: "Vlogger profile creation failed" });
    }
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
  const { userId, shopName, shopAddress, shopDescription, isOpen } = req.body;

  try {
    const shop = await client.VendorProfile.create({
      data: {
        userId: userId,
        shopName: shopName,
        description: shopDescription,
        location: shopAddress,
        isOpen: isOpen,
      },
    });
    if (!shop) {
      return res.status(500).json({ error: "Shop creation failed" });
    }

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
export { };