//server.js
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectToDatabase from "./src/config.js";

import path from "path";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Define Mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  userCount: Number,
  image: String,
});

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});

const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

// Object to store connected users
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("Connection is established");

  socket.on("user", async (username) => {
    // Create or update user in the database
    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { userCount: 1 } },
      { upsert: true, new: true }
    );
    // Emit existing messages to the new user
    const existingMessages = await Message.find().sort({ timestamp: 1 }).exec();
    socket.emit("existingMessages", existingMessages);

    // Store user data using socket ID as the key
    connectedUsers[socket.id] = { userId: user._id, username: user.username };

    // Emit connected users to the new user
    socket.emit("connectedUser", {
      userCounter: Object.keys(connectedUsers).length,
      users: Object.values(connectedUsers).map((user) => user.username),
    });

    // Broadcast the new user to all clients
    socket.broadcast.emit("userJoined", user.username);

    // Emit connected users to all clients
    emitConnectedUsers();
  });

  // Update the 'newMsg' event handler to broadcast the message to all clients
  socket.on("newMsg", async (content) => {
    // Check if the user is connected
    if (connectedUsers[socket.id]) {
      const username = connectedUsers[socket.id].username;
      const timestamp = new Date();

      // Save the message to the database
      const message = new Message({
        username,
        message: content,
        timestamp: timestamp,
      });
      await message.save();

      // Broadcast the message to all clients
      io.emit("broadcastMsg", {
        sender: username,
        message: content,
        timestamp: timestamp.toISOString(),
      });
    }
  });

  socket.on("disconnect", async () => {
    // Check if the user is connected
    if (connectedUsers[socket.id]) {
      const userId = connectedUsers[socket.id].userId;

      // Decrease userCount in the database and remove user data
      await User.findByIdAndUpdate(userId, { $inc: { userCount: -1 } });
      const disconnectedUsername = connectedUsers[socket.id].username;
      delete connectedUsers[socket.id];

      // Emit user disconnection to all clients
      io.emit("userDisconnected", disconnectedUsername);

      // Emit connected users to all clients
      emitConnectedUsers();

      console.log("Connection is disconnected");
    }
  });
});

// Function to emit connected users to all clients
function emitConnectedUsers() {
  const users = Object.values(connectedUsers).map((user) => user.username);
  const userCounter = users.length;
  io.emit("connectedUser", { userCounter, users });
}
app.get("/", (req, res) => {
  res.sendFile(path.resolve(path.join("public", "index.html")));
});

app.use(express.static(path.resolve("public")));

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
  connectToDatabase();
});
