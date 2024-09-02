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
    <div style={{ width: '600px', margin: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ display: 'none' }}>ID Afectación</th> {/* Columna oculta */}
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Afectación</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Tipo</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Estado</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Inicio</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Restitución</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Duración (hs)</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((afectacion, index) => (
              <tr key={index}>
                <td style={{ display: 'none' }}>{afectacion.idafectacion}</td> {/* Columna oculta */}
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{afectacion.afectacion}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{afectacion.tipo}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{afectacion.estado}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{new Date(afectacion.inicio).toLocaleString()}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{afectacion.restitucion ? new Date(afectacion.restitucion).toLocaleString() : 'N/A'}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{calcularDuracion(afectacion.inicio, afectacion.restitucion)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '8px' }}>No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaAfectaciones;
