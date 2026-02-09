const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Post",
    tableName: "posts",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
        content: {
            type: "text",
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE",
        },
    },
});