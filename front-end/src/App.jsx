import { useState,useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'
import { MapContainer, TileLayer, Circle} from "react-leaflet";
import { data } from 'autoprefixer';

function App() {
  const [dataGPS, setGPS] = useState("");
  
  useEffect(() => {
    const socket = io("http://localhost:3000/",{
      transports: ["websocket"],
    });
    socket.connect()
    socket.on("message", newData => {
      // console.log(newData)
      setGPS(newData)
    });
    return () => {
      socket.close();
    }
  },[dataGPS]);
  console.log(dataGPS)
  return (
    <>
      <div className="text-3xl font-bold underline">{dataGPS}</div>
      <MapContainer zoom={20} center={[-7.7699468,110.3769087]} scrollWheelZoom={true}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={dataGPS.length > 0 ?([parseFloat(dataGPS.split(',')[1]), parseFloat(dataGPS.split(',')[2])]):([0,0])}
          radius={10}
          fillColor="red"
          color="red"
          className="bg-color-red"/>
      </MapContainer>
    </>
  )
}

export default App

