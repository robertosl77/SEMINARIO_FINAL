import React from 'react';
import '../css/Listas.css';

function ListaPacientes({ pacientes }) {
  return (
    <div className="container">
    <h3>Pacientes</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Paciente</th> 
            <th className="hiddenColumn">Cuenta</th> 
            <th className="headerCell hiddenOnMobile2">Nombre Paciente</th>
            <th className="headerCell hiddenOnMobile1">DNI</th>
            <th className="headerCell hiddenOnMobile1">Lote</th>
            <th className="headerCell hiddenOnMobile1">Inicio RECS</th>
            <th className="headerCell hiddenOnMobile1">Fin RECS</th>
            <th className="headerCell">Diagnostico</th>
            <th className="headerCell hiddenOnMobile2">Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {pacientes && pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{paciente.idpaciente}</td> 
                <td className="hiddenColumn">{paciente.cuenta}</td> 
                <td className="cell hiddenOnMobile2">{paciente.nombre_paciente}</td>
                <td className="cell hiddenOnMobile1">{paciente.dni}</td>
                <td className="cell hiddenOnMobile1">{paciente.lote}</td>
                <td className="cell hiddenOnMobile1">{paciente.inicio_recs}</td>
                <td className="cell hiddenOnMobile1">{paciente.fin_recs}</td>
                <td className="cell">{paciente.diagnostico}</td>
                <td className="cell hiddenOnMobile2">{paciente.riesgo}</td>

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
