import React, { useState, useEffect, useCallback } from 'react';
import './css/Dashboard.css';

function Dashboard({ setData }) {
  const [dashboardData, setDashboardData] = useState({
    afectados: 0,
    normalizados: 0,
    reclamos: 0,
    reiteracion: 0,
    duracion: 0,
    sin_autonomia: 0,
    sin_gestion: 0,
    fae: 0,
    ami: 0,
    ge: 0,
    seguimiento: 0,
  });

  const handleCardClick = useCallback(async (endpoint) => {
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
        reiteracion: result.dashboard[3] || 0,
        duracion: result.dashboard[4] || 0,
        sin_autonomia: result.dashboard[5] || 0,
        sin_gestion: result.dashboard[6] || 0,
        fae: result.dashboard[7] || 0,
        ami: result.dashboard[8] || 0,
        ge: result.dashboard[9] || 0,
        seguimiento: result.dashboard[10] || 0,
      });

      setData(result); // Actualiza el estado con el resultado del backend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [setData]);

  useEffect(() => {
    handleCardClick('todos'); // Llama al endpoint 'todos' al cargar el componente
  }, [handleCardClick]);

  return (
    <div>
      <div id="header">
      <div className="dashboard">
          <div className="dashboard-card" onClick={() => handleCardClick('afectados')} title="Unicamente Clientes Afectados.">
            <div className="dashboard-title">AFECTADOS</div>
            <div className="dashboard-number">{dashboardData.afectados}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('normalizados')} title="Queda pendiente confirmar si estan con suministro.">
            <div className="dashboard-title">NORMALIZADOS</div>
            <div className="dashboard-number">{dashboardData.normalizados}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('reclamos')} title="Clientes con Reclamos.">
            <div className="dashboard-title">RECLAMOS</div>
            <div className="dashboard-number">{dashboardData.reclamos}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('reiteracion')} title="Clientes con Reiteraciones.">
            <div className="dashboard-title">REITERACIONES</div>
            <div className="dashboard-number">{dashboardData.reiteracion}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('duracion')} title="Cliente cuya afectacion supera un margen de duracion aceptada.">
            <div className="dashboard-title">DURACION</div>
            <div className="dashboard-number">{dashboardData.duracion}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_autonomia')} title="Clientes sin autonomia (por aparatologia).">
            <div className="dashboard-title">SIN AUTONOMÍA</div>
            <div className="dashboard-number">{dashboardData.sin_autonomia}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('sin_gestion')} title="Clientes sin llamar.">
            <div className="dashboard-title">SIN GESTIÓN</div>
            <div className="dashboard-number">{dashboardData.sin_gestion}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('fae')} title="Clientes con FAE.">
            <div className="dashboard-title">FAE</div>
            <div className="dashboard-number">{dashboardData.fae}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('ami')} title="Clientes con AMI.">
            <div className="dashboard-title">AMI</div>
            <div className="dashboard-number">{dashboardData.ami}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('ge')} title="Gestion de Generadores Eléctricos.">
            <div className="dashboard-title">GE</div>
            <div className="dashboard-number">{dashboardData.ge}</div>
          </div>
          <div className="dashboard-card" onClick={() => handleCardClick('seguimiento')} title="Clientes con estado Seguimiento o Rellamar.">
            <div className="dashboard-title">SEGUIMIENTO</div>
            <div className="dashboard-number">{dashboardData.seguimiento}</div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Dashboard;
