import React from 'react';
import '../css/Listas.css';

function ListaTelefonos({ telefonos }) {

  return (
    <div className="container">
    <h3>Telefonos</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID telefono</th> {/* Columna oculta */}
            <th className="hiddenColumn">Cuenta</th> {/* Columna oculta */}
            <th className="headerCell">Telefono</th>
            <th className="headerCell">Tipo</th>
            <th className="headerCell">Efectividad</th>
          </tr>
        </thead>
        <tbody>
          {telefonos && telefonos.length > 0 ? (
            telefonos.map((telefono, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{telefono.idtelefono}</td> {/* Columna oculta */}
                <td className="hiddenColumn">{telefono.cuenta}</td> {/* Columna oculta */}
                <td className="cell">{telefono.telefono}</td>
                <td className="cell">{telefono.tipo}</td>
                <td className="cell">
                  {telefono.llamadas === 0 
                    ? "0%" 
                    : `${((telefono.efectivas / telefono.llamadas) * 100).toFixed(2)}%`}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="noafectaciones">No hay datos de telefonos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaTelefonos;
