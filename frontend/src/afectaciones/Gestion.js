import React, { useState, useEffect } from 'react';
import './css/Listas.css'; // Asegúrate de que el archivo CSS esté importado
import './css/objeto_boton_cierre.css';

function Gestion({ cuenta, idafectacion, telefonos = [], solucion_provisoria = [], onGestionChange, onClose, onContactoAgregado }) {
  const [contacto, setContacto] = useState('');
  const [selectedTelefono, setSelectedTelefono] = useState('');
  const [efectivo, setEfectivo] = useState(1);  // Estado para contacto efectivo
  const [selectedSolucion, setSelectedSolucion] = useState(solucion_provisoria[0] || '');
  const [showSuccess, setShowSuccess] = useState(false);  
  const [showSuccessSP, setShowSuccessSP] = useState(false);  
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga
  const [warningMessage, setWarningMessage] = useState(''); // Estado para mensajes de advertencia

  // Ordenar teléfonos por efectividad (llamadas efectivas / total de llamadas)
  const telefonosOrdenados = [...telefonos].sort((a, b) => (b.efectivas / b.llamadas) - (a.efectivas / a.llamadas));

  // Maneja el envío de datos de contacto a la API y actualiza el estado.
  const handleContactoSubmit = () => {
    // Validación: Verificar si se seleccionó un teléfono
    if (!selectedTelefono) {
      setWarningMessage('Por favor, seleccione un teléfono.');
      setTimeout(() => {
        setWarningMessage('');
      }, 3000);
      return; // Detener la ejecución si no hay teléfono seleccionado
    }

    // Validación: Verificar si el campo de observaciones está vacío
    if (!contacto.trim()) {
      setWarningMessage('Por favor, ingrese observaciones.');
      setTimeout(() => {
        setWarningMessage('');
      }, 3000);
      return; // Detener la ejecución si no hay observaciones
    }

    // Si pasa las validaciones, proceder con la solicitud
    setIsLoading(true); // Activa la carga inmediatamente

    const contactoData = {
      cuenta,
      idafectacion,
      idtelefono: selectedTelefono,
      efectivo,
      usuario: sessionStorage.getItem('username'),
      contacto,
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
        // console.log('Respuesta de la API:', data);
        if (data) {
          // Convertimos selectedTelefono a número
          const telefonoId = parseInt(selectedTelefono, 10);
          // Buscamos el teléfono correspondiente
          const telefonoSeleccionado = telefonos.find(t => t.idtelefono === telefonoId);
  
          const nuevoContacto = {
            idcontacto: data.idcontacto || 'N/A',
            idtelefonos: telefonoId, // Ahora es un número
            cuenta,
            usuario: sessionStorage.getItem('username'),
            fechahora: new Date().toLocaleString(),
            telefono: telefonoSeleccionado?.telefono || 'Desconocido',
            tipo: telefonoSeleccionado?.tipo || 'N/A', // Obtenemos el tipo del teléfono
            efectivo: efectivo === 1 ? 1 : 0,
            observaciones: contacto,
          };
  
          setContacto('');
          setSelectedTelefono('');
          setEfectivo(0);
          setShowSuccess(true);
  
          if (onContactoAgregado) {
            onContactoAgregado(nuevoContacto);
          }
  
          setTimeout(() => {
            setShowSuccess(false);
            setIsLoading(false); // Desactiva la carga cuando el mensaje desaparece
          }, 3000);
        } else {
          setIsLoading(false); // Desactiva la carga si falla la respuesta
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false); // Desactiva la carga en caso de error
      });
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
      {/* Botón de cierre en la esquina superior derecha */}
      <button id="closeButton" onClick={onClose} className="objeto-close-button">
        &times;
      </button>

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

        {/* Botón para enviar el contacto, deshabilitado durante isLoading, showSuccess o showSuccessSP */}
        <button 
          id="boton" 
          onClick={handleContactoSubmit} 
          disabled={isLoading || showSuccess || showSuccessSP}
        >
          Guardar Contacto
        </button>
        
        {/* Mostrar el mensaje de advertencia */}
        {warningMessage && (
          <div className="warning-message">
            {warningMessage}
          </div>
        )}

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
    </div>
  );
}

export default Gestion;
