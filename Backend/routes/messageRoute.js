const express = require("express");
const auth = require("../middleware/authMiddleware");
const { getMessages } = require("../controllers/messageController");

const router = express.Router();

router.get("/:roomId",auth,getMessages)

module.exports = router;
