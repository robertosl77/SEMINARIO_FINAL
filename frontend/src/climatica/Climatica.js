import React, { useEffect, useState } from 'react';
import Navbar from '../navegacion/Navbar';
import './css/Climatica.css';

function Climatica() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/API/ME/ProximasTormentas", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => setClientes(data.filter(cliente => cliente.prioridad > 0))) // Filtrar prioridad 1
      .catch(error => console.error("Error al obtener los datos climáticos", error));
  }, []);

  const getRowColor = (prioridad) => {
    const colors = {
      1: '#d4edda', // Verde pastel
      2: '#fff3cd', // Amarillo pastel
      3: '#ffeeba', // Naranja claro
      4: '#f5c6cb', // Rojo suave
      5: '#f8d7da'  // Rojo más fuerte
    };
    return colors[prioridad] || '#ffffff'; // Blanco por defecto
  };

  return (
    <div>
      <Navbar />
      <div className="content" style={{ marginTop: '60px', padding: '20px' }}>
        <h1>Condiciones Climáticas</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Cliente</th>
              <th>Localidad - Partido</th>
              <th>Condición</th>
              <th>Probabilidad de Lluvia</th>
              <th>Ráfaga de Viento</th>
              <th>Riesgo Severo</th>
              <th style={{ display: 'none' }}>Prioridad</th>
            </tr>
          </thead>
          <tbody>
          {clientes.length === 0 ? (
              <tr><td colSpan="7">No hay datos climáticos disponibles</td></tr>
            ) : (
              clientes.map((cliente, index) => (
                <tr key={index} style={{ backgroundColor: getRowColor(cliente.prioridad) }}>
                  <td>{cliente.cuenta}</td>
                  <td>{cliente.nombre_cliente}</td>
                  <td>{cliente.localidad} - {cliente.partido}</td>
                  <td>{cliente.condicion}</td>
                  <td>{cliente.probabilidad_lluvia}%</td>
                  <td>{cliente.viento_max} km/h</td>
                  <td>{cliente.riesgo_severo}</td>
                  <td style={{ display: 'none' }}>{cliente.prioridad}</td>
                </tr>
              ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Climatica;