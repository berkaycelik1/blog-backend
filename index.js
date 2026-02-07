const authController = require('./controllers/authController');
const express = require('express');
const AppDataSource = require('./data-source');
const cors = require('cors');
const postController = require('./controllers/postController');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/posts', postController.getPosts);
app.get('/posts/:id', postController.getPostById);

app.post('/register', authController.register);
app.post('/login', authController.login);

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