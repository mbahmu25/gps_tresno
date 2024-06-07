import { useState,useEffect } from 'react'

import './App.css'
import { MapContainer, TileLayer, Circle} from "react-leaflet";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className='bg-red-500'>Tes</div> */}
      <MapContainer zoom={10} center={[-7.50659968761,110.191582677]} scrollWheelZoom={true}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  )
}

export default App

