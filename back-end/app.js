import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import fs from 'fs';

// Replace 'COM3' with the appropriate port name on your system
const port = new SerialPort({
  path: "COM3",
  baudRate: 9600, // Ensure the baud rate matches the device's setting
});

const PORT = 3001;

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

const parser = port.pipe(new ReadlineParser());
var tes =''

const checkId = (e) => isNaN(parseInt(e))
const checkCoord = (e) => isNaN(parseFloat(e))
const checkTime = (e) => {
  if (e.split(':').length===3){
    var c = 0;
    var time = e.split(':');
    for (let i = 0; i<time.length;i++){
      c += (isNaN(parseInt(time[i])) ? (true) : (false))
    }
    if (c===3){
      return true
    }
    else{
      return false
    }
  }else{
    return false
  }
  
}

// fs.open('message.txt', 'w', (err, fd) => { 
  parser.on("data", (data) => {
    // console.log(data)
    if (data.split(',').length === 5){
      
      tes = data.split(',')
      // console.log(checkId(tes[0]))
      // console.log(checkCoord(tes[1]))
      // console.log(checkCoord(tes[2]))
      if (!checkId(tes[0])&&!checkCoord(tes[1])&&!checkCoord(tes[2])){
      // if (err) throw err; 
      // const buffer = Buffer.from(tes); 
      // fs.write(fd, buffer, 0, buffer.length, null, (err) => { 
      //   if (err) throw err;      
      //   fs.close(fd, () => { 
      //     console.log('File written!'); 
      //   }); 
      // }); 
        console.log(data)
        io.emit("message", tes);
      }

    }
      
        
  });
  
// }); 

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
