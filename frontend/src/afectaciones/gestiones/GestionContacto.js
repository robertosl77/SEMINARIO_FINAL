import React, { useState } from 'react';

function GestionContacto({ cuenta, idafectacion }) {
  const [observaciones, setObservaciones] = useState('');

  const handleContactoSubmit = () => {
    const contactoData = {
      idafectacion,
      cuenta,
      usuario: 'usuarioLogueado', // Debería reemplazarse por el usuario real logueado
      nota: observaciones,
    };

    fetch(`http://localhost:5000/API/GE/AgregaNota/${cuenta}/${idafectacion}/${observaciones}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactoData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Contacto guardado exitosamente');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div className="container-superior">
        <h3>Contacto Telefonico</h3>
        <div>
          <textarea id="observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
        </div>

        <button id="boton" onClick={handleContactoSubmit}>Guardar Nota</button>
      </div>
    </div>
  );
}

export default GestionContacto;
