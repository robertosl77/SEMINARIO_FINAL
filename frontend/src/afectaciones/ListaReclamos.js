import React from 'react';

function ListaReclamos({ reclamos }) {

  return (
    <div style={styles.container}>
    <h3>Reclamos</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Reclamo</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>ID Afectación</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>Cuenta</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Reclamo</th>
            <th style={styles.headerCell}>Fecha</th>
            <th style={styles.headerCell}>Estado</th>
            <th style={styles.headerCell}>Reiteraciones</th>
          </tr>
        </thead>
        <tbody>
          {reclamos && reclamos.length > 0 ? (
            reclamos.map((reclamo, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{reclamo.idreclamo}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{reclamo.idafectacion}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{reclamo.cuenta}</td> {/* Columna oculta */}
                <td style={styles.cell}>{reclamo.nro_reclamo}</td>
                <td style={styles.cell}>{reclamo.fecha}</td>
                <td style={styles.cell}>{reclamo.estado}</td>
                <td style={styles.cell}>{reclamo.reiteracion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noData}>No hay datos de reclamos disponibles</td>
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

export default ListaReclamos;
