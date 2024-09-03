import React from 'react';
import './css/Listas.css';

function ListaAfectaciones({ afectaciones }) {
  // Función para calcular la duración en horas
  const calcularDuracion = (inicio, restitucion) => {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio;
    return Math.floor(diferenciaMs / (1000 * 60 * 60)); // Convierte ms a horas
  };

  return (
    <div className="container">
      <h3>Afectaciones</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Afectación</th> {/* Columna oculta */}
            <th className="headerCell">Afectación</th>
            <th className="headerCell">Tipo</th>
            <th className="headerCell">Estado</th>
            <th className="headerCell">Inicio</th>
            <th className="headerCell">Restitución</th>
            <th className="headerCell">Duración (hs)</th>
          </tr>
        </thead>
        <tbody>
          {afectaciones && afectaciones.length > 0 ? (
            afectaciones.map((afectacion, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{afectacion.idafectacion}</td> {/* Columna oculta */}
                <td className="cell">{afectacion.afectacion}</td>
                <td className="cell">{afectacion.tipo}</td>
                <td className="cell">{afectacion.estado}</td>
                <td className="cell">{afectacion.inicio}</td>
                <td className="cell">{afectacion.restitucion}</td>
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
