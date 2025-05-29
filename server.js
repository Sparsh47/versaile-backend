import express from "express";
import http from "http";
import cors from "cors";
import {Server} from "socket.io";
import dotenv from "dotenv";
import {connectToDB} from "./config/dbConfig.js";
import {router as authRouter} from "./routes/auth.routes.js"
import {router as documentsRouter} from "./routes/document.routes.js"
import {findOrCreateDocument, saveDocument} from "./controllers/document.controller.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectToDB()

const app = express()
const httpServer = http.createServer(app);

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["https://versaile.vercel.app"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options("*", cors());

const io = new Server(httpServer, {
    cors: {
        origin: ["https://versaile.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("get-document", async (id) => {
        const document = await findOrCreateDocument(id);
        socket.join(id);
        socket.emit("load-document", document.data);
        socket.on("send-changes", (delta) => {
            socket.broadcast.to(id).emit("recieve-changes", delta);
        });
        socket.on("save-document", async (data) => {
            await saveDocument(id, data)
        });
    });
});

app.get("/", (req, res) => {
    return res.status(200).json({message: "Test Message"})
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/documents", documentsRouter)

httpServer.listen(8000, () => {
    console.log("Server running on port", 8000);
});