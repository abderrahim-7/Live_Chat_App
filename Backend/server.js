require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoute');
const ChatRoomRoutes = require('./routes/chatRoomRoute')
const messageRoute = require('./routes/messageRoute')
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const { Socket } = require('dgram');

const socketAuth = require("./middleware/socketMiddleware");
const registerChatSocket = require("./chat/chat.socket");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/room',ChatRoomRoutes);
app.use('/api/messages',messageRoute)

const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173"
    }
})

io.use(socketAuth);

io.on("connection", (socket) =>{
    registerChatSocket(io, socket);
    console.log("New socket connected:", socket.id);
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
