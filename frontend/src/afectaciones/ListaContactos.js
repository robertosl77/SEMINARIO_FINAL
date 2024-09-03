import React from 'react';
import './css/Listas.css';

function ListaContactos({ contactos }) {

  return (
    <div className="container">
    <h3>Contactos</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Contacto</th> {/* Columna oculta */}
            <th className="hiddenColumn">ID Telefono</th> {/* Columna oculta */}
            <th className="hiddenColumn">Cuenta</th> {/* Columna oculta */}
            <th className="headerCell">Usuario</th>
            <th className="headerCell">Fecha/Hora</th>
            <th className="headerCell">Telefono</th>
            <th className="headerCell">Tipo</th>
            <th className="headerCell">Efectivo</th>
            <th className="headerCell">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos && contactos.length > 0 ? (
            contactos.map((contacto, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{contacto.idcontacto}</td> {/* Columna oculta */}
                <td className="hiddenColumn">{contacto.idtelefonos}</td> {/* Columna oculta */}
                <td className="hiddenColumn">{contacto.cuenta}</td>
                <td className="cell">{contacto.usuario}</td>
                <td className="cell">{contacto.fechahora}</td>
                <td className="cell">{contacto.telefono}</td>
                <td className="cell">{contacto.tipo}</td>
                <td className="cell">{contacto.efectivo===1 ? 'Si' : 'No'}</td>
                <td className="cell">{contacto.observaciones}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="noafectaciones">No hay datos de contactos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaContactos;
