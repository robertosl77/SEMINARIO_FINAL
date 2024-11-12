import React, { useState, useEffect } from 'react';
import './css/PanelControl.css'; // Asegúrate de tener un archivo CSS para el estilo específico

const PanelControl = ({ isVisible, onClose, updateDashboardData }) => {
  const [isVisibleLocal, setIsVisible] = useState(isVisible);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 't') {
        event.preventDefault();
        toggleVisibility();
      } else if (event.key === 'Escape') {
        onClose(); // Aquí podría haber un problema si `onClose` no es necesario
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  const handleNuevaAfectacion = async () => {
    try {
      const response = await fetch('http://localhost:5000/API/AF/NuevaAfectacionAT/0', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Nueva Afectación creada:', data);
        alert('Nueva Afectación creada con éxito.');
      } else {
        alert('Error al crear la nueva afectación.');
      }
    } catch (error) {
      console.error('Error al crear una nueva afectación:', error);
      alert('Hubo un error al crear la nueva afectación.');
    }
  };

  const handleNuevosReclamos = async () => {
    try {
      const response = await fetch('http://localhost:5000/API/AF/GeneraReclamos', {
        method: 'POST',
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('Nueva Afectación creada:', data);
        alert('Nueva Afectación creada con éxito.');
      } else {
        console.log('Error al crear nueva afectación:', response.status, response.statusText);
        alert('Error al crear la nueva afectación.');
      }
    } catch (error) {
      console.error('Error al generar nuevos reclamos:', error);
      alert('Hubo un error al generar los nuevos reclamos.');
    }
  };

  return (
    <div className={`panel-control ${isVisibleLocal ? 'visible' : 'hidden'}`}>
      <div className="panel-content">
        <h2>Panel de Control</h2>
        <button onClick={handleNuevaAfectacion}>Nueva Afectación</button>
        <button onClick={handleNuevosReclamos}>Nuevos Reclamos</button>
      </div>
    </div>
  );
};

export default PanelControl;
