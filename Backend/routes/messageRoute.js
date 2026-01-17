const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getMessages, sendMessage } = require("../controllers/messageController");

const router = express.Router();

router.get("/:roomId",auth,getMessages)
router.post("/:roomId",auth, sendMessage)

module.exports = router;
