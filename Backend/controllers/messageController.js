const Message = require("../models/Message");

async function getMessages(req, res) {
    const messages = await Message.find({ room: req.params.roomId })
        .populate("sender", "username")
        .sort({ createdAt: 1 });

    res.json(messages);
}

module.exports = { getMessages};
