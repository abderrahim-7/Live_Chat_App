require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoute');
const chatRoutes = require('./routes/chatRoute');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/chat',chatRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
