import { useState,useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'
import { MapContainer, TileLayer, Circle} from "react-leaflet";
function App() {
  const [dataGPS, setGPS] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:3000/", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Nyambung ngab");
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("message", (newData) => {
      console.log(newData);
      setGPS(newData);
    });
    return () => socket.emit("end");
  }, [dataGPS]);
  return (
    <>
      {/* <div className='bg-red-500'>Tes</div> */}
      <MapContainer zoom={10} center={[-7.50659968761,110.191582677]} scrollWheelZoom={true}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={dataGPS.length > 0 ?([parseFloat(dataGPS[1]), parseFloat(dataGPS[2])]):([0,0])}
          radius={10}
          fillColor="red"
          color="red"
          className="bg-color-red"/>
      </MapContainer>
    </>
  )
}

export default App

