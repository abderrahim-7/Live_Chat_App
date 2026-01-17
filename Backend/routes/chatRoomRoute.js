const express = require("express");
const auth = require("../middleware/authMiddleware");
const {getRoom, createRoom, joinRoom, quitRoom ,getMyRooms } = require("../controllers/chatRoomController");

const router = express.Router();
router.get("/rooms",auth,getMyRooms)

router.post("/create", auth, createRoom);
router.post("/join",auth, joinRoom)
router.delete("/quit", auth, quitRoom);
router.get("/",auth,getRoom)



module.exports = router;
