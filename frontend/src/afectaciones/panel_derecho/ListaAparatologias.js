import React from 'react';
import '../css/Listas.css';

function ListaAparatologias({ aparatologias }) {
  return (
    <div className="container">
    <h3>Aparatologia</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Artefacto</th> 
            <th className="headerCell">Aparato</th>
            <th className="headerCell">Autonomia</th>
          </tr>
        </thead>
        <tbody>
          {aparatologias && aparatologias.length > 0 ? (
            aparatologias.map((aparatologia, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{aparatologia.idartefacto}</td> 
                <td className="cell">{aparatologia.aparato}</td>
                <td className="cell">{aparatologia.autonomia}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="noafectaciones">No hay datos de aparatologias disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAparatologias;
