import React from 'react';
import Navbar from '../navegacion/Navbar';  // Ajusta la ruta según la estructura de tu proyecto

function Manager() {
  return (
    <div>
      <Navbar />
      <div className="content" style={{ marginTop: '60px' }}>
        <h1>Manager Page</h1>
        {/* Contenido de la página */}
      </div>
    </div>
  );
}

export default Manager;
