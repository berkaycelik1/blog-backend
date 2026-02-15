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
    receiver: {
        type: "varchar",
        nullable: true,
    },
    roomId: {
        type: "varchar",
        nullable: true,
    },
    isRead: {
        type: "boolean",
        default: false,
    },
    time: {
        type: "varchar",
    },
    createdAt: {
        type: "timestamp",
        createDate: true,
    },
    },
});
