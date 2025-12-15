const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { createRoom, joinRoom, getMyRooms } = require("../controllers/chatRoomController");

const router = express.Router();
router.post("/create", auth, createRoom);
router.post("/join",auth, joinRoom)
router.get("/rooms",auth,getMyRooms)

module.exports = router;
