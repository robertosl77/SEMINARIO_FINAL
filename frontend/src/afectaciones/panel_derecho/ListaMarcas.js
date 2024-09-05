import React from 'react';
import '../css/Listas.css';

function ListaMarcas({ marcas }) {
  return (
    
    <div className="container">
        <h3>Marcas</h3>
      <table className="table">
        <thead>
          <tr>
            <th className="hiddenColumn">ID Marca</th> {/* Columna oculta */}
            <th className="hiddenColumn">ID Cliente Marca</th>
            <th className="hiddenColumn">Cuenta</th>
            <th className="headerCell">Marca</th>
            <th className="headerCell">Submarca</th>
          </tr>
        </thead>
        <tbody>
          {marcas && marcas.length > 0 ? (
            marcas.map((marca, index) => (
              <tr key={index} className="row">
                <td className="hiddenColumn">{marca.idmarca}</td> {/* Columna oculta */}
                <td className="hiddenColumn">{marca.idclientemarca}</td>
                <td className="hiddenColumn">{marca.cuenta}</td>
                <td className="cell">{marca.marca}</td>
                <td className="cell">{marca.submarca}</td>
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
