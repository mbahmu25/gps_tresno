import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import randomDataGenerator from "./utilities/randomDataGenerator.js";

// Replace 'COM3' with the appropriate port name on your system
const port = new SerialPort({
  path: "COM3",
  baudRate: 9600, // Ensure the baud rate matches the device's setting
});

const PORT = 3000;

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

const parser = port.pipe(new ReadlineParser());

parser.on("data", (data) => {
  console.log(data);
  tes = data;
});

io.on("connection", (socket) => {
  console.log("Front End Connected");
  const data = randomDataGenerator();

  socket.emit("message", data);

  socket.on("end", () => {
    socket.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

port.on("open", () => {
  console.log("Serial port opened");
});
