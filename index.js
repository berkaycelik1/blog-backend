const express = require('express');
const AppDataSource = require('./data-source');
const cors = require('cors');
const authRouters = require('./routes/authRoutes');
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001; 

app.use(cors());
app.use(express.json());

app.use('/auth', authRouters);
app.use('/posts', postRoutes);

AppDataSource.initialize()
.then(() => {
    console.log("🐘 Veritabanı bağlantısı başarılı!");

    app.listen(PORT, () => {
        console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
    });
})

.catch((error) => {
    console.error("❌ Veritabanı Hatası:", error);
}); 