import React, { useState } from 'react';
import './css/Listas.css';

function GestionSolucion({ cuenta, solucion_provisoria = [], telefonos = [], idafectacion, onGestionChange }) {
  const [selectedSolucion, setSelectedSolucion] = useState(solucion_provisoria[0] || '');
  const [showSuccess, setShowSuccess] = useState(false);  // Estado para manejar el mensaje de éxito

  const handleSolucionChange = (event) => {
    const nuevaSolucion = event.target.value;
    setSelectedSolucion(nuevaSolucion);

    fetch(`http://localhost:5000/API/GE/CambiaGestion/${cuenta}/${idafectacion}/${nuevaSolucion}`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        onGestionChange(nuevaSolucion);
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
        <h3>Solucion Provisoria de la cuenta {cuenta}: </h3>

        <select id="solucionSelect" value={selectedSolucion} onChange={handleSolucionChange}>
          {solucion_provisoria.map((solucion, index) => (
            <option key={index} value={solucion}>
              {solucion}
            </option>
          ))}
        </select>

        {/* Mostrar el mensaje de éxito fuera del <select> */}
        {showSuccess && (
          <div className="success-message">
            ¡Se cambió con éxito la Solución Provisoria!
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

export default GestionSolucion;
