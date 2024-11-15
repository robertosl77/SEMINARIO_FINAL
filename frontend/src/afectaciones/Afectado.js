import React, { useState } from 'react';
import './css/Afectado.css';
import './css/objeto_icono.css';
import './css/objeto_boton.css';

function Afectado({
  afectacion,
  afectaciones,
  ami,
  aparatologias,
  cant_reclamos,
  cant_reiteraciones,
  cliente,
  contactos,
  ct,
  cuenta,
  estado,
  fae,
  ge_propio,
  gestion,
  idafectacion,
  inicio,
  marcas,
  pacientes,
  reclamos,
  restitucion,
  telefonos,
  tipo,
  solucion_provisoria,
  onCardClick,
  isSelected // Indica si el afectado está seleccionado
}) {
  const [visible, setVisible] = useState(true); // Nuevo estado para controlar la visibilidad

  const calcularDuracion = (inicio, restitucion) => {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio;
    return Math.floor(diferenciaMs / (1000 * 60 * 60))+3; // Convierte ms a horas
  };

  const handleclick = () => {
    if (onCardClick) {
      onCardClick(telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos, cuenta, idafectacion, solucion_provisoria);
    }
  };

  const handleNormalizarSubmit = () => {
    const normalizaData = {
      cuenta,
      idafectacion,
      usuario: sessionStorage.getItem('username'),
    };

    fetch(`http://localhost:5000/API/AF/NormalizaAfectado/${cuenta}/${idafectacion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizaData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.success) { // Asegúrate de ajustar esta condición según la respuesta de tu API
          setVisible(false); // Oculta el componente
        }
      })
      .catch(error => console.error('Error:', error));
  };

  // Determina clases adicionales basadas en condiciones específicas
  const esBajaPotencial = marcas.some(marca => marca.marca === "BAJA POTENCIAL");
  const esNormalizado = restitucion !== null;
  const esSeguimiento = ["SEGUIMIENTO", "RELLAMAR", "REQUIERE GE"].includes(gestion);
  const esProvisorio = ["CON SUMINISTRO", "SE TRASLADA", "CON AUTONOMÍA", "GE INSTALADO"].includes(gestion);
  const esGestionado = ["ATENDIDO"].includes(gestion);

  const claseTarjeta = `${esSeguimiento ? 'seguimiento' : 
                        esNormalizado ? 'normalizado' : 
                        esProvisorio  ? 'provisorio'  : 
                        esGestionado  ? 'gestionado'  : 
                        esBajaPotencial ? 'baja-potencial' : ''}`;

  if (!visible) return null;                        
  
  return (
    <div 
      className={`afectado-card ${claseTarjeta} ${isSelected ? 'seleccionado' : ''}`}
      onClick={handleclick}
    >
      {isSelected && <div className="indicador-seleccion"></div>} {/* Indicador visual de selección */}
      <div className="afectado-header" onClick={handleclick}>
        <div className="afectado-regionzona">{cliente[0].region + '-' + cliente[0].sector}</div>
        <div className="afectado-afectacion">{afectacion}</div>
        <div className="afectado-origen">{tipo}</div>
        <div className="afectado-ct">CT {ct}</div>
        <div className="afectado-cuenta">Cuenta: {cuenta}</div>
        <div className="afectado-estado">Estado: {estado}</div>
        <div className="afectado-gestion">{gestion}</div>
      </div>
      <div className="afectado-body" onClick={handleclick}>
        <div className="afectado-etiquetas">
          <div className="afectado-reclamos">Reclamos: {cant_reclamos}</div>
          <div className="afectado-reiteraciones">Reiteraciones: {cant_reiteraciones}</div>
          <div className="afectado-aparatologias">Aparatologias: {aparatologias.length}</div>
          <div className="afectado-telefonos">Telefonos: {telefonos.length}</div>
          <div className="afectado-duracion">Duración (hs): {calcularDuracion(inicio, restitucion)}</div>
        </div>
        <div>
          {/* Botón para Normalizar */}
          {restitucion !== null && (
            <button id="boton-normalizar" onClick={(e) => { e.stopPropagation(); handleNormalizarSubmit(); }}>Normalizar</button>
          )}
        </div>        
        <div className="afectado-opciones">
          <div className={fae === 0 ? "afectado-icono fae_off" : "afectado-icono fae"} title="FAE" onClick={(e) => e.stopPropagation()}>{fae ? 'FAE' : ''}</div>
          <div className={ge_propio === 0 ? "afectado-icono ge_propio_off" : "afectado-icono ge_propio"} title="GE Propio" onClick={(e) => e.stopPropagation()}>{ge_propio ? 'GE' : ''}</div>
          <div className={ami === 0 ? "afectado-icono ami_off" : "afectado-icono ami"} title="AMI" onClick={(e) => e.stopPropagation()}>{ami ? 'AMI' : ''}</div>
        </div>
      </div>
    </div>
  );
                        
}

export default Afectado;
