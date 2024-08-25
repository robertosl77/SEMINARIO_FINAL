import React from 'react';
import './css/Afectado.css';

function Afectado() {
  return (
    <div className="afectado-card">
      <div className="afectado-header">
        <div className="afectado-id">A-24-08-0001</div>
        <div className="afectado-ct">CT 1158</div>
        <div className="afectado-cuenta">Cuenta: 12050</div>
        <div className="afectado-nombre">Roberto Sanchez Leiva</div>
      </div>
      <div className="afectado-body">
        <div className="afectado-estado">Estado: Cerrado</div>
        <div className="afectado-gestion">Gestión: REQUIERE GE</div>
        <div className="afectado-fechas">
          <div>Inicio: 2024-08-24 04:06:49</div>
          <div>Restitución: 2024-08-25 00:42:22</div>
        </div>
        <div className="afectado-opciones">
          <div className="afectado-icono fae" title="FAE"></div>
          <div className="afectado-icono ami" title="AMI"></div>
          <div className="afectado-icono ge_propio" title="GE Propio"></div>
        </div>
      </div>
    </div>
  );
}

export default Afectado;
