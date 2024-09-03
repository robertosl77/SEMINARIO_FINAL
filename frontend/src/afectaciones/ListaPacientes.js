import React from 'react';

function ListaPacientes({ pacientes }) {

  return (
    <div style={styles.container}>
    <h3>Pacientes</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.hiddenColumn}>ID Paciente</th> {/* Columna oculta */}
            <th style={styles.hiddenColumn}>Cuenta</th> {/* Columna oculta */}
            <th style={styles.headerCell}>Nombre Paciente</th>
            <th style={styles.headerCell}>DNI</th>
            <th style={styles.headerCell}>Lote</th>
            <th style={styles.headerCell}>Inicio RECS</th>
            <th style={styles.headerCell}>Fin RECS</th>
            <th style={styles.headerCell}>Diagnostico</th>
            <th style={styles.headerCell}>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {pacientes && pacientes.length > 0 ? (
            pacientes.map((paciente, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.hiddenColumn}>{paciente.idpaciente}</td> {/* Columna oculta */}
                <td style={styles.hiddenColumn}>{paciente.cuenta}</td> {/* Columna oculta */}
                <td style={styles.cell}>{paciente.nombre_paciente}</td>
                <td style={styles.cell}>{paciente.dni}</td>
                <td style={styles.cell}>{paciente.lote}</td>
                <td style={styles.cell}>{paciente.inicio_recs}</td>
                <td style={styles.cell}>{paciente.fin_recs}</td>
                <td style={styles.cell}>{paciente.diagnostico}</td>
                <td style={styles.cell}>{paciente.riesgo}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={styles.noData}>No hay datos de pacientes disponibles</td>
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

export default ListaPacientes;
