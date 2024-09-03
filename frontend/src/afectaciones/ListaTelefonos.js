import React from 'react';

function ListaTelefonos({ telefonos }) {

  return (
    <div style={styles.container}>
    <h3>Telefonos</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID telefono</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>Cuenta</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Telefono</th>
            <th style={styles.headerCell}>Tipo</th>
            <th style={styles.headerCell}>Efectividad</th>
          </tr>
        </thead>
        <tbody>
          {telefonos && telefonos.length > 0 ? (
            telefonos.map((telefono, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{telefono.idtelefono}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{telefono.cuenta}</td> {/* Columna oculta */}
                <td style={styles.cell}>{telefono.telefono}</td>
                <td style={styles.cell}>{telefono.tipo}</td>
                <td style={styles.cell}>
                  {telefono.llamadas === 0 
                    ? "0%" 
                    : `${((telefono.efectivas / telefono.llamadas) * 100).toFixed(2)}%`}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={styles.noData}>No hay datos de telefonos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    width: '750px',
    // margin: 'auto',
    margin: '5px',
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

export default ListaTelefonos;
