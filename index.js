const express = require('express');
const cors = require('cors');

const postController = require('./controllers/postController');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/posts', postController.getPosts);

app.listen(PORT, () => {
    console.log("Sunucu çalışıyor... Port: " + PORT);

});