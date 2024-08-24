import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import './css/Dashboard.css';
import './css/Manager.css';

function Manager() {
  const [data, setData] = useState(null); // Estado para almacenar el resultado del backend
  const [dashboardData, setDashboardData] = useState({
    afectados: 0,
    normalizados: 0,
    reclamos: 0,
    sin_gestion: 0,
    sin_autonomia: 0,
    fae: 0,
    ami: 0,
    otro1: 0,
    otro2: 0,
    otro3: 0,
    otro4: 0,
  });

  const handleCardClick = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/API/MN/GestionaTarjeta/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result); // Enviar JSON recibido a la consola

      setDashboardData({
        afectados: result.dashboard[0] || 0,
        normalizados: result.dashboard[1] || 0,
        reclamos: result.dashboard[2] || 0,
        sin_gestion: result.dashboard[3] || 0,
        sin_autonomia: result.dashboard[4] || 0,
        fae: result.dashboard[5] || 0,
        ami: result.dashboard[6] || 0,
        otro1: result.dashboard[7] || 0,
        otro2: result.dashboard[8] || 0,
        otro3: result.dashboard[9] || 0,
        otro4: result.dashboard[10] || 0,
      });

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
            <div className="dashboard-number">{dashboardData.afectados}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('normalizados')}>
            <div className="dashboard-title">NORMALIZADOS</div>
            <div className="dashboard-number">{dashboardData.normalizados}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('reclamos')}>
            <div className="dashboard-title">RECLAMOS</div>
            <div className="dashboard-number">{dashboardData.reclamos}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_gestion')}>
            <div className="dashboard-title">SIN GESTIÓN</div>
            <div className="dashboard-number">{dashboardData.sin_gestion}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_autonomia')}>
            <div className="dashboard-title">SIN AUTONOMÍA</div>
            <div className="dashboard-number">{dashboardData.sin_autonomia}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('fae')}>
            <div className="dashboard-title">FAE</div>
            <div className="dashboard-number">{dashboardData.fae}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('ami')}>
            <div className="dashboard-title">AMI</div>
            <div className="dashboard-number">{dashboardData.ami}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro1')}>
            <div className="dashboard-title">OTRO1</div>
            <div className="dashboard-number">{dashboardData.otro1}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro2')}>
            <div className="dashboard-title">OTRO2</div>
            <div className="dashboard-number">{dashboardData.otro2}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro3')}>
            <div className="dashboard-title">OTRO3</div>
            <div className="dashboard-number">{dashboardData.otro3}</div> {/* Valor dinámico */}
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('otro4')}>
            <div className="dashboard-title">OTRO4</div>
            <div className="dashboard-number">{dashboardData.otro4}</div> {/* Valor dinámico */}
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