require("dotenv").config();
const { Router: expressRouter } = require("express");
const Vendor = expressRouter();
const { PrismaClient, Prisma } = require("@prisma/client");
const client = new PrismaClient();

Vendor.get("/posts", async (req: any, res: any) => {
    const userId = parseInt(req.query.userId);

    try {
        const posts = await client.Product.findMany({
            where: { userId: userId },
        })
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching vendor posts", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

Vendor.post("/upload", async (req: any, res: any) => {
    const { userId, place, name, description, price, mediaUrl } = req.body;
    const roundedPrice = parseFloat(price).toFixed(2);
    console.log(name, description, roundedPrice, mediaUrl, userId);
    try {
        const data = await client.product.create({
            data: {
                userId: Number(userId),
                place,
                name,
                description,
                price: new Prisma.Decimal(roundedPrice), // recommended for Decimal fields
                imageUrl: mediaUrl,
            },
        });

        console.log("Successful");
        return res.status(200).json("Post Uploaded");
    } catch (error) {
        console.error("Error uploading post:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});


module.exports = Vendor
export { }