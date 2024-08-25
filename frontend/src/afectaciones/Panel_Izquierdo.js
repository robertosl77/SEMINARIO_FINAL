import React from 'react';
import Afectado from './Afectado';
import './css/Panel_Izquierdo.css';

function LeftPanel({ data }) {
  return (
    <div id="left-panel">
      <div className="App">
        <Afectado />
      </div>    
      {/* Contenido del panel izquierdo */}
      {data && data.afectados && data.afectados.length > 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID Afectación</th>
              <th>Afectación</th>
              <th>CT</th>
              <th>Cuenta</th>
              <th>Estado</th>
              <th>Gestión</th>
              <th>Inicio</th>
              <th>Restitución</th>
              <th>FAE</th>
              <th>AMI</th>
              <th>GE_PROPIO</th>
              <th>RECLAMOS</th>
              <th>REITERACIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.afectados.map((afectado, index) => (
              <tr key={index}>
                <td>{afectado.idafectacion}</td>
                <td>{afectado.afectacion}</td>
                <td>{afectado.ct}</td>
                <td>{afectado.cuenta}</td>
                <td>{afectado.estado}</td>
                <td>{afectado.gestion}</td>
                <td>{afectado.inicio}</td>
                <td>{afectado.restitucion}</td>
                <td>{afectado.fae}</td>
                <td>{afectado.ami}</td>
                <td>{afectado.ge_propio}</td>
                <td>{afectado.cant_reclamos}</td>
                <td>{afectado.cant_reiteraciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos de afectados disponibles.</p>
      )}
    </div>
  );
}

export default LeftPanel;
