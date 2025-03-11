import React, { useState, useEffect } from 'react';
import './css/Listas.css'; // Asegúrate de que el archivo CSS esté importado

function Gestion({ cuenta, idafectacion, telefonos = [], solucion_provisoria = [], onGestionChange, onClose }) {
  const [contacto, setContacto] = useState('');
  const [selectedTelefono, setSelectedTelefono] = useState('');
  const [efectivo, setEfectivo] = useState(1);  // Estado para contacto efectivo
  const [selectedSolucion, setSelectedSolucion] = useState(solucion_provisoria[0] || '');
  const [showSuccess, setShowSuccess] = useState(false);  
  const [showSuccessSP, setShowSuccessSP] = useState(false);  

  // Ordenar teléfonos por efectividad (llamadas efectivas / total de llamadas)
  const telefonosOrdenados = [...telefonos].sort((a, b) => (b.efectivas / b.llamadas) - (a.efectivas / a.llamadas));

  const handleContactoSubmit = () => {
    const contactoData = {
      "cuenta": cuenta,
      "idafectacion": idafectacion,
      "idtelefono": selectedTelefono, 
      "efectivo": efectivo, 
      "usuario": sessionStorage.getItem('username'),
      "contacto": contacto,
    };

    fetch(`${process.env.REACT_APP_API_URL}/API/GE/AgregaContacto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactoData),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setContacto('');
          setSelectedTelefono('');
          setEfectivo(0); 
          setShowSuccess(true);

          setTimeout(() => {
            setShowSuccess(false);
            if (onClose) onClose(); // 🔹 Cierra el modal después de 3 segundos
          }, 3000);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // Función para manejar el cambio de la solución provisoria
  const handleSolucionChange = (event) => {
    const nuevaSolucion = event.target.value;
    setSelectedSolucion(nuevaSolucion);

    fetch(`${process.env.REACT_APP_API_URL}/API/GE/CambiaGestion/${cuenta}/${idafectacion}/${nuevaSolucion}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          onGestionChange(nuevaSolucion);
          setShowSuccessSP(true);  // Mostrar mensaje de éxito

          // Ocultar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            setShowSuccessSP(false);
          }, 3000);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // Reiniciar el estado cuando `cuenta` o `idafectacion` cambien
  useEffect(() => {
    setSelectedSolucion(solucion_provisoria[0] || '');
    setShowSuccessSP(false);  // Ocultar el mensaje de éxito al cambiar de afectado
  }, [cuenta, idafectacion, solucion_provisoria]);  

  return (
    <div>
      <div className="container-superior">
        <h3 className="container-title">Contacto</h3>
        <label htmlFor="solucionSelect">Solucion Provisoria:</label>
        <select id="solucionSelect" value={selectedSolucion} onChange={handleSolucionChange}> 
          <option value="">Seleccione una Opción</option>
          {solucion_provisoria.map((solucion, index) => (
            <option key={index} value={solucion}>
              {solucion}
            </option>
          ))}
        </select>

        <div id="contenedorTelefono" className="telefono-contacto-container">
          {/* Selector de teléfonos */}
          <div className="telefono-select-wrapper">
            <label htmlFor="telefonoSelect">Seleccione Telefono:</label>
            <select
              id="telefonoSelect"
              value={selectedTelefono}
              onChange={(e) => setSelectedTelefono(e.target.value)}
              className="telefonoSelect"
            >
              <option value="">Seleccione una Opción</option>
              {telefonosOrdenados.map((telefono) => (
                <option key={telefono.idtelefono} value={telefono.idtelefono}>
                  {telefono.telefono} (Efectividad: {isNaN(telefono.efectivas / telefono.llamadas * 100)
                    ? 0
                    : Math.round((telefono.efectivas / telefono.llamadas) * 100)}%)
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox para contacto efectivo */}
          <div className="checkbox-container">
            <label htmlFor="efectivoCheckbox">Contacto Efectivo:</label>
            <label className="switch">
              <input
                type="checkbox"
                id="efectivoCheckbox"
                checked={efectivo === 1}
                onChange={(e) => setEfectivo(e.target.checked ? 1 : 0)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Campo de texto para observaciones */}
        <div>
          <label htmlFor="observaciones">Observaciones:</label>
          <textarea
            id="observaciones"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="Escribe tu contacto aquí..."
          ></textarea>
        </div>

        {/* Botón para enviar el contacto */}
        <button id="boton" onClick={handleContactoSubmit}>Guardar Contacto</button>

        {/* Mostrar el mensaje de éxito */}
        {showSuccess && (
          <div className="success-message">
            ¡Contacto guardado con éxito!
          </div>
        )}
        {/* Mostrar el mensaje de éxito fuera del <select> */}
        {showSuccessSP && (
          <div className="success-message">
            ¡Se cambió con éxito la Solución Provisoria!
          </div>
        )}        
      </div>
      <style>{`
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

export default Gestion;
