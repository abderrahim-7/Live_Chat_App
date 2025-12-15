const Message = require("../models/Message");

function registerChatSocket(io, socket) {

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });

    socket.on("send-message", async ({ roomId, content }) => {
        const message = await Message.create({
            room: roomId,
            sender: socket.user.id,
            content
        });

        io.to(roomId).emit("new-message", {
            _id: message._id,
            content,
            sender: socket.user.id,
            createdAt: message.createdAt
        });
    });
}

module.exports = registerChatSocket;
