import React from 'react';
import Navbar from '../navegacion/Navbar';
import './css/Dashboard.css';

function Manager() {
  return (
    <div>
      <Navbar />
        <div className="dashboard">
          <div className="dashboard-card">EDP Afectados: 15</div>
          <div className="dashboard-card">Reclamos: 5</div>
          <div className="dashboard-card">Sin Llamar: 10</div>
          <div className="dashboard-card">Sin Autonomía: 2</div>
          <div className="dashboard-card">Sin FAE: 12</div>
          <div className="dashboard-card">Sin AMI: 8</div>
          <div className="dashboard-card">Seguimiento: 2</div>
        </div>
        <div className="content">
          <h1>Manager Page</h1>
          <p>Acá está reservado para colocar una tabla, pero a futuro</p>
        </div>
    </div>
  );
}

export default Manager;
