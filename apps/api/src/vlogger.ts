require("dotenv").config();
const { Router: expressRouter } = require("express");
const Vlogger = expressRouter();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

Vlogger.get("/posts", async (req: any, res: any) => {
    const userId = parseInt(req.query.userId);
    try {
        const posts = await client.Post.find({
            where: { userId: userId },
        })
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching vlogger posts", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

Vlogger.post("/upload", async (req: any, res: any) => {
    const { title, content, mediaUrl, type, userId } = req.body;
    console.log(title, content, mediaUrl, type, userId);
    
})

module.exports = Vlogger
export { }