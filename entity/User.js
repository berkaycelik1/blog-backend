const { EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fullName: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        },
    },
    relations: {
        posts: {
            target: "Post",
            type: "one-to-many",
            inverseSide: "user",
        },
    },
});