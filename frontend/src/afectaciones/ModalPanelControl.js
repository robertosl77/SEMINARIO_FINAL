import React, { useState, useEffect } from 'react';
import './css/ModalPanelControl.css'; // Asegúrate de tener un archivo CSS para el estilo específico

const ModalPanelControl = ({ isVisible, onClose }) => {
  // const username = sessionStorage.getItem('username');
  const rol = sessionStorage.getItem('rol');
  const [isVisibleLocal, setIsVisible] = useState(isVisible);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (rol==='admin'){
      const handleKeyPress = (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'A') {
          event.preventDefault();
          toggleVisibility();
        } else if (event.key === 'Escape') {
          onClose(); // Aquí podría haber un problema si `onClose` no es necesario
        }
      };
      
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
}, [rol, onClose]);

const handleNuevaBD = async () => {
  const confirmacion = window.confirm('¿Estás seguro de que deseas crear una nueva base de datos?');

  if (!confirmacion) {
    return; // Si el usuario cancela, no se ejecuta el código
  }
  
  try {
    const response = await fetch('${process.env.REACT_APP_API_URL}/API/BD/CreaTablas', {
      method: 'POST',
    });
    if (response.ok) {
      const data = await response.json();
      alert('Nueva Base de Datos creada con éxito.');
      window.location.reload();
    } else {
      alert('Error al crear la Base de Datos.');
    }
  } catch (error) {
    console.error('Error al crear la Base de Datos:', error);
    alert('Hubo un error al crear la Base de Datos.');
  }
};

const handleNuevaAfectacion = async () => {
  try {
    const response = await fetch('${process.env.REACT_APP_API_URL}/API/AF/NuevaAfectacionAT/0', {
      method: 'POST',
    });
    if (response.ok) {
      const data = await response.json();
      alert('Nueva Afectación creada con éxito.');
      window.location.reload();
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
      const response = await fetch('${process.env.REACT_APP_API_URL}/API/AF/GeneraReclamos', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        alert('Nueva Afectación creada con éxito.');
        window.location.reload();
      } else {
        alert('Error al crear la nueva afectación.');
      }
    } catch (error) {
      console.error('Error al generar nuevos reclamos:', error);
      alert('Hubo un error al generar los nuevos reclamos.');
    }
  };

  const handleNormalizaAfectaciones = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/API/AF/NormalizarElementosAleatorios', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        alert('Afectaciones normalizadas con extio.');
        window.location.reload();
      } else {
        alert('Error al normalizar afectaciones.');
      }
    } catch (error) {
      console.error('Error al normalizar afectaciones:', error);
      alert('Hubo un error al normalizar afectaciones.');
    }
  };

  return (
    <div className={`panel-control ${isVisibleLocal ? 'visible' : 'hidden'}`}>
      <div className="panel-content">
        <h2>Panel de Control</h2>
        <button className="control-button danger" title="Crea la base de datos, junto con tablas y el poblado de datos simulados. " onClick={handleNuevaBD}>Nueva BD SQLite</button>
        <button className="control-button" title="Crea una nueva afectación aleatoria. " onClick={handleNuevaAfectacion}>Nueva Afectación</button>
        <button className="control-button" title="Crea reclamos unicamente en afectaciones existentes. " onClick={handleNuevosReclamos}>Nuevos Reclamos</button>
        <button className="control-button" title="Normaliza afectaciones aleatorias. " onClick={handleNormalizaAfectaciones}>Normaliza Afectaciones</button>
      </div>
    </div>
  );
};

export default ModalPanelControl;
