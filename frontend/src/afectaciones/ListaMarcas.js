import React from 'react';

function ListaMarcas({ marcas }) {
  console.log(marcas);
  return (
    
    <div style={styles.container}>
        <h3>Marcas</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Marca</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>ID Cliente Marca</th>
            <th style={styles.hiddenColumn}>Cuenta</th>
            <th style={styles.headerCell}>Marca</th>
            <th style={styles.headerCell}>Submarca</th>
          </tr>
        </thead>
        <tbody>
          {marcas && marcas.length > 0 ? (
            marcas.map((marca, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{marca.idmarca}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{marca.idclientemarca}</td>
                <td style={styles.hiddenColumn}>{marca.cuenta}</td>
                <td style={styles.cell}>{marca.marca}</td>
                <td style={styles.cell}>{marca.submarca}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={styles.nomarcas}>No hay datos disponibles</td>
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
    padding: '10px',
    fontSize: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    margin: '5px',
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
  nomarcas: {
    textAlign: 'center',
    padding: '16px',
    color: '#999',
  },
};

export default ListaMarcas;
