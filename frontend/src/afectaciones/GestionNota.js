import React, { useState } from 'react';

function GestionNota({ cuenta, idafectacion }) {
  const [nota, setNota] = useState('');

  const handleContactoSubmit = () => {
    const contactoData = {
      "cuenta":cuenta,
      "idafectacion":idafectacion,
      "usuario":sessionStorage.getItem('username'),
      "nota": nota,
    };

    // fetch(`http://localhost:5000/API/GE/AgregaNota/${cuenta}/${idafectacion}/${sessionStorage.getItem('username')}/${nota}`, {
    fetch(`http://localhost:5000/API/GE/AgregaNota`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( contactoData ),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Contacto guardado exitosamente');
          setNota('');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div className="container-superior">
        <h3>Nota</h3>
        <div>
          <textarea id="observaciones" value={nota} onChange={(e) => setNota(e.target.value)}></textarea>
        </div>

        <button id="boton" onClick={handleContactoSubmit}>Guardar Nota</button>
      </div>
    </div>
  );
}

export default GestionNota;
