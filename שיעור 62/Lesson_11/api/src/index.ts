import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// Store room users
interface RoomUsers {
  [room: string]: Set<string>;
}

// Store username to socket mapping for room management
interface UsernameToSocket {
  [username: string]: Socket;
}

interface RoomSockets {
  [room: string]: UsernameToSocket;
}

// Store message history per room
interface Message {
  username: string;
  message: string;
  timestamp: string;
}

interface RoomMessages {
  [room: string]: Message[];
}

const roomUsers: RoomUsers = {};
const roomMessages: RoomMessages = {};
const roomSockets: RoomSockets = {};

// Helper to get current open rooms (rooms with active users)
const getOpenRooms = (): string[] => {
  return Object.keys(roomUsers);
};

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("join-room", (data: { room: string; username: string }) => {
    const { room, username } = data;
    
    // Initialize room if it doesn't exist
    if (!roomUsers[room]) {
      roomUsers[room] = new Set();
    }
    
    // Initialize message history if it doesn't exist
    if (!roomMessages[room]) {
      roomMessages[room] = [];
    }
    
    // Initialize socket mapping if it doesn't exist
    if (!roomSockets[room]) {
      roomSockets[room] = {};
    }
    
    // Add user to room
    roomUsers[room].add(username);
    
    // Store socket mapping
    roomSockets[room][username] = socket;
    
    // Join socket.io room
    socket.join(room);
    
    console.log(`${username} joined room: ${room}`);
    
    // Notify others in the room
    socket.to(room).emit("user-joined", {
      username,
      room,
      users: Array.from(roomUsers[room]),
    });
    
    // Send confirmation, current users, message history, and current rooms to the joining user
    socket.emit("room-joined", {
      room,
      username,
      users: Array.from(roomUsers[room]),
      history: roomMessages[room],
      rooms: getOpenRooms(),
    });

    // Update rooms list to all clients (used by admin UI)
    io.emit("rooms-list", { rooms: getOpenRooms() });
  });

  // Send message
  socket.on("send-message", (data: { room: string; username: string; message: string }) => {
    const { room, username, message } = data;
    
    console.log(`Message in ${room} from ${username}: ${message}`);
    
    // Create message object
    const messageObj: Message = {
      username,
      message,
      timestamp: new Date().toISOString(),
    };
    
    // Store message in history
    if (!roomMessages[room]) {
      roomMessages[room] = [];
    }
    roomMessages[room].push(messageObj);
    
    // Broadcast to all users in the room
    io.to(room).emit("receive-message", messageObj);
  });

  // Leave room
  socket.on("leave-room", (data: { room: string; username: string }) => {
    const { room, username } = data;
    
    if (roomUsers[room]) {
      roomUsers[room].delete(username);
      
      // Clean up empty rooms (but keep message history)
      if (roomUsers[room].size === 0) {
        delete roomUsers[room];
      }
    }
    
    // Remove from socket mapping
    if (roomSockets[room]) {
      delete roomSockets[room][username];
    }
    
    socket.leave(room);
    
    console.log(`${username} left room: ${room}`);
    
    // Notify others
    socket.to(room).emit("user-left", {
      username,
      room,
      users: roomUsers[room] ? Array.from(roomUsers[room]) : [],
    });

    // Update rooms list after potential room change
    io.emit("rooms-list", { rooms: getOpenRooms() });
  });

  // Remove user (admin only)
  socket.on("remove-user", (data: { room: string; adminUsername: string; targetUsername: string }) => {
    const { room, adminUsername, targetUsername } = data;
    
    // Check if requester is admin
    if (adminUsername !== "admin") {
      socket.emit("remove-user-error", {
        message: "Only admin can remove users"
      });
      return;
    }
    
    // Check if target user exists in the room
    if (!roomSockets[room] || !roomSockets[room][targetUsername]) {
      socket.emit("remove-user-error", {
        message: `User ${targetUsername} not found in room ${room}`
      });
      return;
    }
    
    // Get target user's socket
    const targetSocket = roomSockets[room][targetUsername];
    
    // Remove from room
    if (roomUsers[room]) {
      roomUsers[room].delete(targetUsername);
      
      // Clean up empty rooms
      if (roomUsers[room].size === 0) {
        delete roomUsers[room];
      }
    }
    
    // Remove from socket mapping
    delete roomSockets[room][targetUsername];
    
    // Disconnect the user
    targetSocket.leave(room);
    
    // Notify the removed user
    targetSocket.emit("user-removed", {
      room,
      message: "You have been removed from the room by admin"
    });
    
    // Notify everyone in the room (including admin) with updated users list
    io.to(room).emit("user-removed-notification", {
      username: targetUsername,
      room,
      users: roomUsers[room] ? Array.from(roomUsers[room]) : [],
    });

    // Confirm to admin
    socket.emit("remove-user-success", {
      message: `User ${targetUsername} has been removed from the room`
    });

    console.log(`Admin ${adminUsername} removed ${targetUsername} from room ${room}`);

    // Update rooms list after potential room change
    io.emit("rooms-list", { rooms: getOpenRooms() });
  });

  // Provide current rooms list (admin UI)
  socket.on("get-rooms", () => {
    socket.emit("rooms-list", { rooms: getOpenRooms() });
  });

  // Delete a room (admin only)
  socket.on("delete-room", (data: { adminUsername: string; room: string }) => {
    const { adminUsername, room } = data;

    // Check admin privileges
    if (adminUsername !== "admin") {
      socket.emit("delete-room-error", { message: "Only admin can delete rooms" });
      return;
    }

    if (!roomUsers[room] || roomUsers[room].size === 0) {
      // If no active users tracked, still clean up any persisted state
      delete roomUsers[room];
      delete roomSockets[room];
      delete roomMessages[room];
      io.emit("rooms-list", { rooms: getOpenRooms() });
      socket.emit("delete-room-success", { message: `Room ${room} deleted` });
      console.log(`Admin ${adminUsername} deleted empty room ${room}`);
      return;
    }

    // Notify and disconnect all users in the room
    const usersInRoom = Array.from(roomUsers[room]);
    for (const username of usersInRoom) {
      const targetSocket = roomSockets[room] ? roomSockets[room][username] : undefined;
      if (targetSocket) {
        targetSocket.emit("room-deleted", {
          room,
          message: "admin deleted the room",
        });
        targetSocket.leave(room);
      }
    }

    // Cleanup room data
    delete roomUsers[room];
    delete roomSockets[room];
    delete roomMessages[room];

    // Update rooms list and inform admin
    io.emit("rooms-list", { rooms: getOpenRooms() });
    socket.emit("delete-room-success", { message: `Room ${room} deleted` });
    console.log(`Admin ${adminUsername} deleted room ${room}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

