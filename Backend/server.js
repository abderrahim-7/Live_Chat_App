require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken'); // <-- FIXED
const Message = require('./models/Message');

const authRoutes = require('./Routes/authRoute');
const ChatRoomRoutes = require('./routes/chatRoomRoute');
const messageRoute = require('./routes/messageRoute');

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/room', ChatRoomRoutes);
app.use('/api/messages', messageRoute);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"], credentials: true }
});

// SOCKET AUTH
io.use((socket, next) => {
    const token = socket.handshake.auth?.token; // <-- ? prevents crash
    if (!token) return next(new Error("Unauthorized"));

    try {
        socket.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        console.log("Socket auth error:", err.message);
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
    });

   socket.on("send-message", async ({ roomId, content }) => {
        const message = await Message.create({
            room: roomId,
            sender: socket.user.id,
            content
        });

        await message.populate("sender", "username");

        io.to(roomId).emit("new-message", message);
    });


    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
