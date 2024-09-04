import React, { useState } from 'react';
import './css/Listas.css';

function GestionSolucion({ cuenta, solucion_provisoria = [], telefonos = [], idafectacion, onGestionChange }) {
  const [selectedSolucion, setSelectedSolucion] = useState(solucion_provisoria[0] || '');

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
        setSelectedSolucion(''); // Restablecer el valor del select a vacío después del cambio
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
      </div>
    </div>
  );
}

export default GestionSolucion;
