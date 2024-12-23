import "dotenv/config";
import express from "express";
import http from "http"; // Import the http module
import cors from "cors";
import { initializeSocket } from './socket.js';
import router from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import connectDB from "./configs/mongoDB.js";
import cookieParser from "cookie-parser";
import mapRouter from "./routes/maps.routes.js";
import rideRouter from "./routes/ride.routes.js";

const PORT = process.env.PORT || 3000;
const app = express();

// Create an HTTP server instance
const server = http.createServer(app);

// Initialize Socket.IO with the server instance
initializeSocket(server);

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define routes
app.use("/users", router);
app.use("/captains", captainRouter);
app.use("/maps", mapRouter);
app.use("/rides", rideRouter);

// Start the server
server.listen(PORT, () => console.log("Server running on Port " + PORT));
