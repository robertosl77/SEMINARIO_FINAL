import React from 'react';
import Navbar from '../navegacion/Navbar';  // Ajusta la ruta según la estructura de tu proyecto

function Climatica() {
  return (
    <div>
      <Navbar />
      <div className="content" style={{ marginTop: '60px' }}>
        <h1>Climatica</h1>
        {/* Contenido de la página */}
      </div>
    </div>
  );
}

export default Climatica;
