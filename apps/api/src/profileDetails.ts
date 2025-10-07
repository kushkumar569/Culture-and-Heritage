require("dotenv").config();
const { Router: expressRouter  } = require("express");
const profileDetails = expressRouter();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

profileDetails.get("/vendor", async (req: any, res: any) => {
  const userId = parseInt(req.query.userId);
  console.log(userId);
  
  try {
    const vendorProfile = await client.VendorProfile.findUnique({
      where: { userId: userId },
    });
    res.status(200).json(vendorProfile);
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = profileDetails;
export {}; // use this to prevent "Cannot redeclare block-scoped variable" error in VSCode