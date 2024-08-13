import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import './App.css';
import { MapContainer, TileLayer, Circle, WMSTileLayer } from "react-leaflet";

function App() {
  const [dataGPS0, setGPS0] = useState([]);
  const [dataGPS1, setGPS1] = useState([]);
  const [dataGPS2, setGPS2] = useState([]);
  const [dataGPS3, setGPS3] = useState([]);
  const [dataGPS4, setGPS4] = useState([]);
  const [isFull, setFull] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:3001/", {
      transports: ["websocket"],
    });

    socket.on("message", (newData) => {
      console.log(newData)
      const data = newData;
      const id = data[0];

      switch(id) {
        case '1':
          setGPS0(data);
          break;
        case '2':
          setGPS1(data);
          break;
        case '3':
          setGPS2(data);
          break;
        case '4':
          setGPS3(data);
          break;
        case '5':
          setGPS4(data);
          break;
        default:
          break;
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='w-2/3'>
        <MapContainer zoom={20} center={[-7.7699468, 110.3769087]} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution=''
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <WMSTileLayer params={{format:'image/png',transparent:true,layers:"ne:tes"}} url="http://localhost:8080/geoserver/ne/wms"/>
          <Circle
            center={dataGPS0.length > 0 ? [parseFloat(dataGPS0[1]), parseFloat(dataGPS0[2])] : [0, 0]}
            radius={1}
            fillColor="red"
            color="red"
          />
          <Circle
            center={dataGPS1.length > 0 ? [parseFloat(dataGPS1[1]), parseFloat(dataGPS1[2])] : [0, 0]}
            radius={1}
            fillColor="blue"
            color="blue"
          />
          <Circle
            center={dataGPS2.length > 0 ? [parseFloat(dataGPS2[1]), parseFloat(dataGPS2[2])] : [0, 0]}
            radius={1}
            fillColor="green"
            color="green"
          />
          <Circle
            center={dataGPS3.length > 0 ? [parseFloat(dataGPS3[1]), parseFloat(dataGPS3[2])] : [0, 0]}
            radius={1}
            fillColor="yellow"
            color="yellow"
          />
          <Circle
            center={dataGPS4.length > 0 ? [parseFloat(dataGPS4[1]), parseFloat(dataGPS4[2])] : [0, 0]}
            radius={1}
            fillColor="purple"
            color="purple"
          />
        </MapContainer>
      </div>
      <div className='flex flex-col bg-red-500 w-1/3 p-2 h-full'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className='border border-black my-1 rounded-[10px] h-full w-full bg-blue-500 flex justify-center items-center'>
      <span className='text-white'>Card Content</span>
    </div>
  );
}

export default App;
