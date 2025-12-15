const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
