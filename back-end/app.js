import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

// Replace 'COM3' with the appropriate port name on your system
const port = new SerialPort({
  path: "COM5",
  baudRate: 115200, // Ensure the baud rate matches the device's setting
});

const PORT = 3000;

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

const parser = port.pipe(new ReadlineParser());
var tes =''
parser.on("data", (data) => {
  
  console.log(data)
  tes = data
  io.emit("message", data);
      
});
io.on("connection", (socket) => {
  console.log("Front End Connected");

  socket.on("end", () => {
    socket.emit("message", tes);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});





app.get("/", (req, res) => {
  res.send(tes);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

port.on("open", () => {
  console.log("Serial port opened");
});
