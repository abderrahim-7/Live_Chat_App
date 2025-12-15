const ChatRoom = require("../Models/ChatRoom");
const crypto = require("crypto");

async function createRoom(req, res) {
    const { name } = req.body;

    if (!name){
        res.status(400).json({message : "Missing room name"})
    }

    const code = crypto.randomBytes(3).toString("hex");

    const room = await ChatRoom.create({
        name,
        code,
        members: [req.user.id]
    });

    res.status(201).json({room : room , message : "Room created successfuly"});
}

async function joinRoom(req, res) {
    const { code } = req.body;
    if(!code) return res.status(400).json({message: "missing room code"})

    const room = await ChatRoom.findOne({ code });
    if (!room) return res.status(404).json({ message: "Invalid code" });

    if (!room.members.includes(req.user.id)) {
        room.members.push(req.user.id);
        await room.save();
    }

    res.status(200).json({room : room , message : "User joined successfuly"});
}

async function getMyRooms(req, res) {
    const rooms = await ChatRoom.find({
        members: req.user.id
    });

    res.json(rooms);
}



module.exports = { createRoom , joinRoom, getMyRooms};
