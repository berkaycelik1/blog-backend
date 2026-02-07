const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "berkaycelik",
    password:"",
    database: "blog_db",
    synchronieze: true,
    logging: true,
    entities: [],
});

module.exports = AppDataSource;