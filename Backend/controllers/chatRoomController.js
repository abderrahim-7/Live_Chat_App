const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const crypto = require("crypto");

async function getRoom(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Missing room id" });
    }

    const room = await ChatRoom.findById(id);

    if (!room.members.includes(req.user.id)) {
  return res.status(403).json({ message: "Access denied" });
    }


    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}


async function createRoom(req, res) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Missing room name" });
        }

        const existingRoom = await ChatRoom.findOne({
            name,
            members: req.user.id
        });

        if (existingRoom) {
            return res.status(409).json({
                message: "You already have a room with this name"
            });
        }

        const code = crypto.randomBytes(3).toString("hex");

        const room = await ChatRoom.create({
            name,
            code,
            members: [req.user.id]
        });

        res.status(201).json({
            room,
            message: "Room created successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


async function joinRoom(req, res) {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "missing room code" });

    const room = await ChatRoom.findOne({ code });
    if (!room) return res.status(404).json({ message: "Invalid code" });

    if (!room.members.includes(req.user.id)) {
      room.members.push(req.user.id);
      await room.save();
    }

    res.status(200).json({ room, message: "User joined successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function quitRoom(req, res) {
  try {
    const { id } = req.query;

    const room = await ChatRoom.findById(id);
    if (!room) return res.status(404).json({ message: `Room not found ${id}`  });

    room.members = room.members.filter(
      memberId => memberId.toString() !== req.user.id.toString()
    );

    await room.save();

    res.status(200).json({ message: "User quit successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}


async function getMyRooms(req, res) {
  const rooms = await ChatRoom.find({ members: req.user.id });

  const roomsWithLastMessage = await Promise.all(
    rooms.map(async (room) => {
      const lastMessage = await Message.find({ room: room._id })
        .sort({ createdAt: -1 })
        .limit(1)
        .populate("sender", "username");

      return {
        _id: room._id,
        name: room.name,
        code: room.code,
        members: room.members,
        lastMessage: lastMessage[0] || null
      };
    })
  );

  res.json(roomsWithLastMessage);
}



module.exports = {getRoom, createRoom , joinRoom, quitRoom,getMyRooms};
