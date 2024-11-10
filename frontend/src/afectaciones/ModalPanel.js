import React, { useEffect } from 'react';
import './ModalPanel.css';

function ModalPanel({ isVisible, onClose, children }) {
  // Cerrar al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Manejar clase `no-scroll` para el body
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isVisible]);

  // Cerrar al hacer clic fuera del contenido
  const handleOverlayClick = (event) => {
    if (event.target.className === 'modal-overlay') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

export default ModalPanel;
