import React from 'react';
import '../css/Listas.css';

function ListaReclamos({ reclamos }) {
  return (
    <div className="container">
    <h3>Reclamos</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Reclamo</th> 
            <th className="hiddenColumn">ID Afectación</th> 
            <th className="hiddenColumn">Cuenta</th> 
            <th className="headerCell">Reclamo</th>
            <th className="headerCell">Fecha</th>
            <th className="headerCell">Estado</th>
            <th className="headerCell">Reiteraciones</th>
          </tr>
        </thead>
        <tbody>
          {reclamos && reclamos.length > 0 ? (
            reclamos.map((reclamo, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{reclamo.idreclamo}</td> 
                <td className="hiddenColumn">{reclamo.idafectacion}</td> 
                <td className="hiddenColumn">{reclamo.cuenta}</td> 
                <td className="cell">{reclamo.nro_reclamo}</td>
                <td className="cell">{reclamo.fecha}</td>
                <td className="cell">{reclamo.estado}</td>
                <td className="cell">{reclamo.reiteracion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="noafectaciones">No hay datos de reclamos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaReclamos;
