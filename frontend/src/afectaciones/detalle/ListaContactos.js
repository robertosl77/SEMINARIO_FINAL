import React from 'react';
import '../css/Listas.css';

function ListaContactos({ contactos }) {
  return (
    <div className="container">
      <h3>Contactos</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Contacto</th>
            <th className="hiddenColumn">ID Telefono</th>
            <th className="hiddenColumn">Cuenta</th>
            <th className="headerCell hiddenOnMobile2">Usuario</th>
            <th className="headerCell hiddenOnMobile2">Fecha/Hora</th>
            <th className="headerCell hiddenOnMobile1">Telefono</th>
            <th className="headerCell hiddenOnMobile1">Tipo</th>
            <th className="headerCell hiddenOnMobile1">Efectivo</th>
            <th className="headerCell">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos && contactos.length > 0 ? (
            contactos.map((contacto, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{contacto.idcontacto}</td>
                <td className="hiddenColumn">{contacto.idtelefonos}</td>
                <td className="hiddenColumn">{contacto.cuenta}</td>
                <td className="cell hiddenOnMobile2">{contacto.usuario}</td>
                <td className="cell hiddenOnMobile2">{contacto.fechahora}</td>
                <td className="cell hiddenOnMobile1">{contacto.telefono}</td>
                <td className="cell hiddenOnMobile1">{contacto.tipo}</td>
                <td className="cell hiddenOnMobile1">{contacto.efectivo === 1 ? 'Si' : 'No'}</td>
                <td className="cell">{contacto.observaciones}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="noafectaciones">No hay datos de contactos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaContactos;