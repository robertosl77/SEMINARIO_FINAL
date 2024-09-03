import React from 'react';
import './css/Listas.css';

function ListaPacientes({ pacientes }) {

  return (
    <div className="container">
    <h3>Pacientes</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Paciente</th> {/* Columna oculta */}
            <th className="hiddenColumn">Cuenta</th> {/* Columna oculta */}
            <th className="headerCell">Nombre Paciente</th>
            <th className="headerCell">DNI</th>
            <th className="headerCell">Lote</th>
            <th className="headerCell">Inicio RECS</th>
            <th className="headerCell">Fin RECS</th>
            <th className="headerCell">Diagnostico</th>
            <th className="headerCell">Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {pacientes && pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{paciente.idpaciente}</td> {/* Columna oculta */}
                <td className="hiddenColumn">{paciente.cuenta}</td> {/* Columna oculta */}
                <td className="cell">{paciente.nombre_paciente}</td>
                <td className="cell">{paciente.dni}</td>
                <td className="cell">{paciente.lote}</td>
                <td className="cell">{paciente.inicio_recs}</td>
                <td className="cell">{paciente.fin_recs}</td>
                <td className="cell">{paciente.diagnostico}</td>
                <td className="cell">{paciente.riesgo}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="noafectaciones">No hay datos de pacientes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPacientes;
