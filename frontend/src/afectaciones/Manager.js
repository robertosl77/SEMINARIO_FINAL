import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import './css/Dashboard.css';
import './css/Manager.css';

function Manager() {
  const [data, setData] = useState(null); // Estado para almacenar el resultado del backend

  const handleCardClick = async (endpoint) => {
    try {
      const response = await fetch('http://localhost:5000/API/MN/GestionaTarjeta/'+endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      setData(result); // Actualiza el estado con el resultado del backend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div id="header">
        <Navbar />
        <div className="dashboard">
          <div className="dashboard-card" onClick={() => handleCardClick('afectados')}>
            <div className="dashboard-title">AFECTADOS</div>
            <div className="dashboard-number">15</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('normalizados')}>
            <div className="dashboard-title">NORMALIZADOS</div>
            <div className="dashboard-number">2</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('reclamos')}>
            <div className="dashboard-title">RECLAMOS</div>
            <div className="dashboard-number">5</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_gestion')}>
            <div className="dashboard-title">SIN GESTIÓN</div>
            <div className="dashboard-number">10</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_autonomia')}>
            <div className="dashboard-title">SIN AUTONOMÍA</div>
            <div className="dashboard-number">2</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('fae')}>
            <div className="dashboard-title">FAE</div>
            <div className="dashboard-number">12</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('ami')}>
            <div className="dashboard-title">AMI</div>
            <div className="dashboard-number">8</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro1')}>
            <div className="dashboard-title">OTRO1</div>
            <div className="dashboard-number">2</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro2')}>
            <div className="dashboard-title">OTRO2</div>
            <div className="dashboard-number">2</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro3')}>
            <div className="dashboard-title">OTRO3</div>
            <div className="dashboard-number">2</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro4')}>
            <div className="dashboard-title">OTRO4</div>
            <div className="dashboard-number">2</div>
          </div>
        </div>
      </div>
      <div id="content">
        <h1>Manager Page</h1>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Muestra el JSON formateado
        ) : (
          <p>Acá está reservado para colocar una tabla, pero a futuro</p>
        )}
      </div>
    </div>
  );
}

export default Manager;
