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
  const rol = sessionStorage.getItem('rol');
  const [visible, setVisible] = useState(true); // Nuevo estado para controlar la visibilidad

  const calcularDuracion = (inicio, restitucion) => {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio; // Diferencia en milisegundos

    // Convertir diferencias de tiempo
    const segundos = Math.floor(diferenciaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30); // Aproximado

    // Devolver en el formato correcto
    if (segundos < 60) return `${segundos} seg`;
    if (minutos < 60) return `${minutos} min`;
    if (horas < 24) return `${horas} hs`;
    if (dias < 7) return `${dias} días`;
    if (dias < 30) return `${semanas} semanas`;
    return `${meses} meses`;
  };

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha);

    // Obtener día de la semana, día, mes y año en formato largo
    const opcionesFecha = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);

    // Obtener hora en formato 24h
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const horaFormateada = fechaObj.toLocaleTimeString('es-ES', opcionesHora);

    return `${fechaFormateada} a las ${horaFormateada}`;
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

    fetch(`${process.env.REACT_APP_API_URL}/API/AF/NormalizaAfectado/${cuenta}/${idafectacion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(normalizaData),
    })
      .then(response => response.json())
      .then(data => {
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
        <div className="afectado-datos">
          <div className="afectado-regionzona">Zona: {cliente[0].region + '-' + cliente[0].sector}</div>
          <div className="afectado-afectacion">ID: {afectacion}</div>
          <div className="afectado-origen">Tipo: {tipo}</div>
          <div className="afectado-ct">CT: {ct}</div>
          <div className="afectado-cuenta">Cuenta: {cuenta}</div>
        </div>
        <div className="afectado-estado">Estado: {estado}</div>
        <div className="afectado-gestion">{gestion}</div>
      </div>
      <div className="afectado-body" onClick={handleclick}>
        <div className="afectado-etiquetas">
          {/* RECLAMOS */}
          <div 
            className="afectado-reclamos"
            title={cant_reclamos > 0 
              ? `Cliente gestionó ${cant_reclamos} reclamos en la afectación ${afectacion}` 
              : "Sin reclamos"
            }
          >Reclamos: {cant_reclamos}</div>
          {/* REITERACIONES */}
          <div 
            className="afectado-reiteraciones"
            title={cant_reiteraciones > 0 
              ? `Cliente reitero en ${cant_reiteraciones} oportunidades` 
              : "Sin reiteraciones"
            }
          >Reiteraciones: {cant_reiteraciones}</div>
          {/* APARATOLOGIAS */}
          <div 
            className="afectado-aparatologias"
            title={aparatologias.length > 0 
              ? `Aparatologías registradas: ${aparatologias.map(a => a.aparato).join(", ")}`
              : "No posee aparatologías registradas para soporte de vida"
            }
          >
            Aparatologías: {aparatologias.length}
          </div>
          {/* TELEFONOS */}
          <div 
            className="afectado-telefonos"
            title={telefonos.length > 0 
              ? `Teléfonos registrados: ${telefonos.map(a => {
                  const indiceEfectividad = a.llamadas > 0 ? ((a.efectivas / a.llamadas) * 100).toFixed(1) + "%" : "N/A";
                  return `${a.telefono} (Efectividad: ${indiceEfectividad})`;
                }).join(", ")}`
              : "No posee teléfonos registrados"
            }
          >
            Teléfonos: {telefonos.length}
          </div>
          {/* TIEMPO DE AFECTACION */}
          <div 
            className="afectado-duracion"
            title={`Inicio de corte: ${formatearFecha(inicio)}`}
          >
            Duración (hs): {calcularDuracion(inicio, restitucion)}
          </div>
        </div>
        
        {/* Botón para Normalizar */}
        <div>
          {['admin','operador'].includes(rol) && restitucion !== null && (
            <button id="boton-normalizar" onClick={(e) => { e.stopPropagation(); handleNormalizarSubmit(); }}>Normalizar</button>
          )}
        </div>        
        <div className="afectado-opciones">
          <div 
            className={fae === 0 ? "afectado-icono fae_off" : "afectado-icono fae"} 
            title={fae === 0 ? "No posee FAE (Fuente Alternativa de Eneriga simil UPS)" : "Posee FAE (Fuente Alternativa de Energia simil UPS)"} 
            onClick={(e) => e.stopPropagation()}
          >{fae ? 'FAE' : ''}</div>
          <div 
            className={ge_propio === 0 ? "afectado-icono ge_propio_off" : "afectado-icono ge_propio"} 
            title={ge_propio === 0 ? "No posee Grupo Electrogeno Propio" : "Posee Grupo Electrogeno Propio"} 
            onClick={(e) => e.stopPropagation()}
          >{ge_propio ? 'GE' : ''}</div>
          <div 
            className={ami === 0 ? "afectado-icono ami_off" : "afectado-icono ami"} 
            title={ami === 0 ? "No posee Medidor Inteligente con tecnologia GPS" : "Posee Medidor Inteligente con tecnologia GPS"} 
            onClick={(e) => e.stopPropagation()}
          >{ami ? 'AMI' : ''}</div>
        </div>
      </div>
    </div>
  );
                        
}

export default Afectado;
