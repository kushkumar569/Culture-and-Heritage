require("dotenv").config();
const { Router: expressRouter } = require("express");
const Vlogger = expressRouter();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

Vlogger.get("/posts", async (req: any, res: any) => {
    const userId = parseInt(req.query.userId);  
    
    try {
        const posts = await client.Post.findMany({
            where: { userId: userId },
        })
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching vlogger posts", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

Vlogger.post("/upload", async (req: any, res: any) => {
    const { title, content, mediaUrl, type, userId, place } = req.body;
    console.log(title, content, mediaUrl, type, userId);
    try{
        const data = await client.Post.create({
            data: {
                userId: userId,
                title: title,
                content: content,
                mediaUrl: mediaUrl,
                type: type,
                place: place
            }
        })
        if(data){
           return res.status(200).json("Post Uploaded");
        }
        return res.status(404).json("post uploading failed")
    } catch(error){
        return res.json("internal server error",error)
    }
})

module.exports = Vlogger
export { }