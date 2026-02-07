const User = require("./entity/User");
const { DataSource} = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "berkaycelik",
    password:"",
    database: "blog_db",
    synchronize: true,
    logging: true,
    entities: [User],
});

module.exports = AppDataSource;