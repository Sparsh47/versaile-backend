import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import {connectToDB} from "./config/dbConfig.js";
import {router as authRouter} from "./routes/auth.routes.js"
import {findOrCreateDocument, saveDocument} from "./controllers/document.controller.js";

dotenv.config();

connectToDB()

const app = express()
app.use(express.json())
app.use(cors({
  origin: ["https://versaile.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST"],
  withCredentials: true
}))

const io = new Server(process.env.PORT_NO, {
  cors: {
    origin: ["https://versaile.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
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

app.use("/api/v1/auth", authRouter)

app.listen(8000, ()=>{
  console.log("Server started on port 8000");
})