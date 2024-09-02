import React from 'react';

function ListaAfectaciones({ data }) {
  // Función para calcular la duración en horas
  const calcularDuracion = (inicio, restitucion) => {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio;
    return Math.floor(diferenciaMs / (1000 * 60 * 60)); // Convierte ms a horas
  };

  return (
    <div style={styles.container}>
        <h3>Afectaciones</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Afectación</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Afectación</th>
            <th style={styles.headerCell}>Tipo</th>
            <th style={styles.headerCell}>Estado</th>
            <th style={styles.headerCell}>Inicio</th>
            <th style={styles.headerCell}>Restitución</th>
            <th style={styles.headerCell}>Duración (hs)</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((afectacion, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{afectacion.idafectacion}</td> {/* Columna oculta */}
                <td style={styles.cell}>{afectacion.afectacion}</td>
                <td style={styles.cell}>{afectacion.tipo}</td>
                <td style={styles.cell}>{afectacion.estado}</td>
                <td style={styles.cell}>{new Date(afectacion.inicio).toLocaleString()}</td>
                <td style={styles.cell}>{afectacion.restitucion ? new Date(afectacion.restitucion).toLocaleString() : 'N/A'}</td>
                <td style={styles.cell}>{calcularDuracion(afectacion.inicio, afectacion.restitucion)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={styles.noData}>No hay datos disponibles</td>
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
    width: '100%',
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

export default ListaAfectaciones;
