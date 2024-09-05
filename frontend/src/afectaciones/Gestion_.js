import React, { useState } from 'react';
// import './css/Gestion.css';

function Gestion({ cuenta, solucion_provisoria = [], telefonos = [], idafectacion, onGestionChange }) {
  const [selectedSolucion, setSelectedSolucion] = useState(solucion_provisoria[0] || '');
  const [selectedTelefono, setSelectedTelefono] = useState(telefonos[0]?.telefono || '');
  const [observaciones, setObservaciones] = useState('');
  const [tipoNota, setTipoNota] = useState('nota');
  const [contactoEfectivo, setContactoEfectivo] = useState(false);

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

  const handleContactoSubmit = () => {
    const contactoData = {
      idafectacion,
      cuenta,
      usuario: 'usuarioLogueado', // Debería reemplazarse por el usuario real logueado
      tipoNota,
      idtelefono: tipoNota === 'contacto' ? telefonos.find(t => t.telefono === selectedTelefono).idtelefono : null,
      contactoEfectivo: tipoNota === 'contacto' ? contactoEfectivo : null,
      observaciones,
    };

    fetch('/API/GE/Contacto', {
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

  const handleTipoNotaChange = (event) => {
    setTipoNota(event.target.value);
  };

  return (
    <div>
      <h3>Gestión para la cuenta: {cuenta}</h3>
      <div>
        <label htmlFor="solucionSelect">Solución Provisoria:</label>
        <select id="solucionSelect" value={selectedSolucion} onChange={handleSolucionChange}>
          {solucion_provisoria.map((solucion, index) => (
            <option key={index} value={solucion}>
              {solucion}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4>Registrar contacto</h4>
        <div>
          <label htmlFor="tipoNotaSelect">Tipo de Nota:</label>
          <select id="tipoNotaSelect" value={tipoNota} onChange={handleTipoNotaChange}>
            <option value="nota">Nota</option>
            <option value="contacto">Contacto</option>
          </select>
        </div>

        {tipoNota === 'contacto' && (
          <>
            <div>
              <label htmlFor="telefonoSelect">Teléfonos:</label>
              <select id="telefonoSelect" value={selectedTelefono} onChange={(e) => setSelectedTelefono(e.target.value)}>
                {telefonos.map((telefono, index) => (
                  <option key={index} value={telefono.telefono}>
                    {telefono.telefono} (Efectividad: {(telefono.efectivas / telefono.llamadas) * 100}%)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>
                <input type="checkbox" checked={contactoEfectivo} onChange={(e) => setContactoEfectivo(e.target.checked)} />
                Contacto Efectivo
              </label>
            </div>
          </>
        )}

        <div>
          <label htmlFor="observaciones">Observaciones:</label>
          <textarea id="observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
        </div>

        <button onClick={handleContactoSubmit}>Guardar Contacto</button>
      </div>

      <div>
        <button>Normalizar</button>
      </div>

      <div>
        <button>Ir a Vista Cliente</button>
      </div>
    </div>
  );
}

export default Gestion;
