const EntitySchema = require("typeorm").EntitySchema;
module.exports = new EntitySchema ({
    name: "Message",
    tableName: "messages",

    columns: {
    id: {
        primary: true,
        type: "int",
        generated: true,
    },
    text: {
        type: "text",
    },
    sender: {
        type: "varchar",
    },
    time: {
        type: "varchar",
    },
    },
});
