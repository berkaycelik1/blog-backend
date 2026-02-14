const express = require('express');
const AppDataSource = require('./data-source');
const cors = require('cors');
const authRouters = require('./routes/authRoutes');
const postRoutes = require("./routes/postRoutes");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./entity/Message");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001; 
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

app.use(cors());
app.use(express.json());

app.use('/auth', authRouters);
app.use('/posts', postRoutes);

io.on("connection", async (socket) => {
    console.log(`⚡️ Birisi Telsize Bağlandı! ID: ${socket.id}`);
    const messageRepo = AppDataSource.getRepository(Message);
    const oldMessages = await messageRepo.find({ order: {id: "ASC"} });
    socket.emit("load_messages", oldMessages);
    socket.on("send_message", async (data) => {
        console.log("📩 Mesaj Geldi:", data);
        const messageRepo = AppDataSource.getRepository(Message);
        const newMessage = messageRepo.create({
          text: data.text,
          sender: data.sender,
          time: data.time  
        });
        await messageRepo.save(newMessage);
        io.emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log("❌ Birisi Telsizi Kapattı.");
    });
});

AppDataSource.initialize()
.then(() => {
    console.log("🐘 Veritabanı bağlantısı başarılı!");

    httpServer.listen(PORT, () => {
        console.log(`✅ Sunucu ve Telsiz çalışıyor: http://localhost:${PORT}`);
    });
})

.catch((error) => {
    console.error("❌ Veritabanı Hatası:", error);
});