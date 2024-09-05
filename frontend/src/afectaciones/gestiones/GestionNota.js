import React, { useState } from 'react';

function GestionNota({ cuenta, idafectacion }) {
  const [nota, setNota] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);  // Nuevo estado para manejar el mensaje de éxito

  const handleContactoSubmit = () => {
    const contactoData = {
      "cuenta": cuenta,
      "idafectacion": idafectacion,
      "usuario": sessionStorage.getItem('username'),
      "nota": nota,
    };

    fetch(`http://localhost:5000/API/GE/AgregaNota`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactoData),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setNota('');
          setShowSuccess(true);  // Mostrar mensaje de éxito

          // Ocultar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <div className="container-superior">
        <h3>Nota</h3>
        <div>
          <textarea
            id="observaciones"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Escribe tu nota aquí..."
          ></textarea>
        </div>

        <button id="boton" onClick={handleContactoSubmit}>Guardar Nota</button>

        {/* Mostrar el mensaje de éxito */}
        {showSuccess && (
          <div className="success-message">
            ¡Nota guardada con éxito!
          </div>
        )}
      </div>

      <style jsx>{`
        .success-message {
          margin-top: 10px;
          padding: 10px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 5px;
          animation: fade-in 0.5s ease-in-out;
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default GestionNota;
