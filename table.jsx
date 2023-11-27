import { supabase } from "../libs/supabaseClient";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Table() {
  const [query, setQuery] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("mediciones").select();
      console.log(data);
      setQuery(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <MapContainer
        center={[0, 0]} // Punto central inicial (ajustar según tus necesidades)
        zoom={2} // Nivel de zoom inicial (ajustar según tus necesidades)
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {query.map((item) => (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
          >
            <Popup>
              <div>
                <h2>{item.id}</h2>
                <p>Station ID: {item.station_id}</p>
                <p>Temperature: {item.temperature}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', background: '#f2f2f2' }}>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>ID</th>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>ID station</th>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>Latitude</th>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>Longitude</th>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>Temperature</th>
            <th style={{ background: 'linear-gradient(to bottom, #FF6F61, #3498db)' }}>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {query.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.station_id}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td>{item.temperature}</td>
              <td>{item.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
