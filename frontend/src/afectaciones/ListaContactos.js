import React from 'react';

function ListaContactos({ contactos }) {

  return (
    <div style={styles.container}>
    <h3>Contactos</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Contacto</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>ID Telefono</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>Cuenta</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Usuario</th>
            <th style={styles.headerCell}>Fecha/Hora</th>
            <th style={styles.headerCell}>Telefono</th>
            <th style={styles.headerCell}>Tipo</th>
            <th style={styles.headerCell}>Efectivo</th>
            <th style={styles.headerCell}>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {contactos && contactos.length > 0 ? (
            contactos.map((contacto, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{contacto.idcontacto}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{contacto.idtelefonos}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{contacto.cuenta}</td>
                <td style={styles.cell}>{contacto.usuario}</td>
                <td style={styles.cell}>{contacto.fechahora}</td>
                <td style={styles.cell}>{contacto.telefono}</td>
                <td style={styles.cell}>{contacto.tipo}</td>
                <td style={styles.cell}>{contacto.efectivo===1 ? 'Si' : 'No'}</td>
                <td style={styles.cell}>{contacto.observaciones}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noData}>No hay datos de contactos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    width: '600px',
    margin: 'auto',
    padding: '10px',
    fontSize: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  table: {
    width: 'auto', // El ancho de la tabla es automático según el contenido
    borderCollapse: 'collapse',
  },
  hiddenColumn: {
    display: 'none',
  },
  headerCell: {
    borderBottom: '2px solid #ddd',
    padding: '12px 8px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    fontWeight: 'bold',
    color: '#333',
  },
  cell: {
    borderBottom: '1px solid #ddd',
    padding: '10px 8px',
    textAlign: 'left',
    color: '#555',
  },
  row: {
    transition: 'background-color 0.3s',
  },
  rowHover: {
    backgroundColor: '#f9f9f9',
  },
  noData: {
    textAlign: 'center',
    padding: '16px',
    color: '#999',
  },
};

export default ListaContactos;
