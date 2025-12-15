const Message = require("../models/Message");

async function saveMessage(message) {
    return Message.create(message);
}

module.exports = { saveMessage };
