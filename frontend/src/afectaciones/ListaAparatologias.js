import React from 'react';

function ListaAparatologias({ aparatologias }) {

  return (
    <div style={styles.container}>
    <h3>Aparatologia</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Artefacto</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Aparato</th>
            <th style={styles.headerCell}>Autonomia</th>
          </tr>
        </thead>
        <tbody>
          {aparatologias && aparatologias.length > 0 ? (
            aparatologias.map((aparatologia, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{aparatologia.idartefacto}</td> {/* Columna oculta */}
                <td style={styles.cell}>{aparatologia.aparato}</td>
                <td style={styles.cell}>{aparatologia.autonomia}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={styles.noData}>No hay datos de aparatologias disponibles</td>
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

export default ListaAparatologias;
