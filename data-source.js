const Message = require("./entity/Message");
const { DataSource } = require("typeorm");
const User = require("./entity/User");
const Post = require("./entity/Post");

require("dotenv").config();

const AppDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Post, Message],
});

module.exports = AppDataSource; 