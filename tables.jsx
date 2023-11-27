import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lbpluquxsogddtorsvud.supabase.co'; // Reemplaza 'your_project_id' con tu ID de proyecto de Supabase
const supabaseKey = 'yoeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicGx1cXV4c29nZGR0b3JzdnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2NDI0NDIsImV4cCI6MjAxMzIxODQ0Mn0.SB28ruT7yG9S9KUNbEIYNxuRMMs4DUJeF59xIN4j5Bw'; // Reemplaza 'your_api_key' con tu clave de API de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Table() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTableData() {
      try {
        const { data, error } = await supabase
          .from('mediciones') // Reemplaza 'nombre_de_la_tabla' con el nombre de tu tabla en Supabase
          .select('*'); // Puedes seleccionar campos específicos en lugar de '*'

        if (error) {
          setError('Error al obtener los datos de la tabla');
        } else {
          setTableData(data);
        }
      } catch (error) {
        setError('Error al obtener los datos de la tabla');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTableData();
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <p>Tabla Component</p>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>created_at</th>
            <th>station_id</th>
            <th>latitude</th>
            <th>longitude</th>
            <th>temperature</th>
            <th>humidity</th>
            {/* Agrega más encabezados de columna según tu tabla */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.created_at}</td>
              <td>{row.station_id}</td>
              <td>{row.latitude}</td>
              <td>{row.longitude}</td>
              <td>{row.temperature}</td>
              <td>{row.humidity}</td>
              {/* Agrega más celdas de datos según tu tabla */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
