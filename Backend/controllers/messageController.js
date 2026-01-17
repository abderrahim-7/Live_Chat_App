const Message = require("../models/Message");

async function getMessages(req, res) {
    const messages = await Message.find({ room: req.params.roomId })
        .populate("sender", "username")
        .sort({ createdAt: 1 });

    res.json(messages);
}

async function sendMessage(req, res) {
    const { content } = req.body;

    if (!content || content.trim() === "") {
        return res.status(400).json({ message: "The message is empty !!!" });
    }

    const message = new Message({
        room: req.params.roomId,
        sender: req.user.id,
        content
    });

    await message.save();

    res.status(200).json({ message: "Message sent successfully", data: message });
}


module.exports = { getMessages, sendMessage};
