import React from 'react';
import { calcularDuracion } from '../../utils/funciones';
import '../css/Listas.css';

function ListaAfectaciones({ afectaciones }) {
  return (
    <div className="container">
      <h3>Afectaciones</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Afectación</th> 
            <th className="headerCell">Afectación</th>
            <th className="headerCell hiddenOnMobile2">Tipo</th>
            <th className="headerCell">Estado</th>
            <th className="headerCell hiddenOnMobile1">Inicio</th>
            <th className="headerCell hiddenOnMobile1">Restitución</th>
            <th className="headerCell">Duración (hs)</th>
          </tr>
        </thead>
        <tbody>
          {afectaciones && afectaciones.length > 0 ? (
            afectaciones.map((afectacion, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{afectacion.idafectacion}</td> 
                <td className="cell">{afectacion.afectacion}</td>
                <td className="cell hiddenOnMobile2">{afectacion.tipo}</td>
                <td className="cell">{afectacion.estado}</td>
                <td className="cell hiddenOnMobile1">{afectacion.inicio}</td>
                <td className="cell hiddenOnMobile1">{afectacion.restitucion}</td>
                <td className="cell">{calcularDuracion(afectacion.inicio, afectacion.restitucion)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="noafectaciones">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAfectaciones;
