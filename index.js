const express = require('express');
const AppDataSource = require('./data-source');
const cors = require('cors');
const authRouters = require('./routes/authRoutes');
const postRoutes = require("./routes/postRoutes");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./entity/Message");
require("dotenv").config();

let onlineUsers = {};
let usersCredentials = {};

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

io.on("connection", (socket) => {
    console.log(`⚡️ Birisi Bağlandı! ID: ${socket.id}`);
    socket.on("login", ({username, password}) => {
        if (usersCredentials[username]) {
        if (usersCredentials[username] === password) {
        onlineUsers[socket.id] = username;
        socket.emit("login_success");
        io.emit("active_users", Object.values(onlineUsers));
        console.log(`✅ ${username} giriş yaptı (Şifre Doğru).`);
    } else {
            socket.emit("login_error", "❌ Hatalı şifre! Bu isim alınmış.");
            console.log(`🚫 ${username} İçin hatalı şifre denemesi.`);
        } 
    } else {
        usersCredentials[username] = password;
        onlineUsers[socket.id] = username;
        socket.emit("login_success");
        io.emit("active_users", Object.values(onlineUsers));
        console.log(`🆕 Yeni Kullanıcı Kayboldu: ${username}`);
    }
    });
    socket.on("join_room", async (roomId) => {
        socket.join(roomId);
        console.log(`👥 User ${socket.id} şu odaya girdi: ${roomId}`);
        try {
            const messageRepo = AppDataSource.getRepository(Message);
            const roomMessages = await messageRepo.find({
                where: { roomId: roomId },
                order:{ createdAt: "ASC" } 
            });
            socket.emit("load_messages", roomMessages);
        } catch (e) {
            console.error("Hata:", e);
        }
    });
    socket.on("send_message", async (data) => {
        console.log("📩 Mesaj Geldi:", data);

        try {
            const messageRepo = AppDataSource.getRepository(Message);
            const newMessage = messageRepo.create({
                text: data.text,
                sender: data.sender,
                roomId: data.roomId,
                receiver: data.receiver,
                time: data.time
            });

            await messageRepo.save(newMessage);
            io.to(data.roomId).emit("receive_message", data);
            } catch (err) {
                console.error("Mesaj kaydedilemedi:", err);
            }
            });
            
    socket.on("disconnect", () => {
        const cikanKisim = onlineUsers[socket.id];
        if (cikanKisim) {
            delete onlineUsers[socket.id];
            console.log(`❌ Çıkış Yapıldı: ${cikanKisim}`);
            io.emit("active_users", Object.values(onlineUsers));
        } else {
            console.log("❌ Birisi Telsizi Kapattı (Giriş yapmamıştı).");
        }
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