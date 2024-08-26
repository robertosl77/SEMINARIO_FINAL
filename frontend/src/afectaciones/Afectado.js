import React from 'react';
import './css/Afectado.css';

function Afectado({
  idafectacion,
  afectacion,
  tipo,
  estado,
  ct,
  inicio,
  restitucion,
  cuenta,
  gestion,
  fae,
  ami,
  ge_propio,
  cant_reclamos,
  cant_reiteraciones,
  aparatologia,
  telefonos,
  reclamos,
  marcas,
  contactos,
  solucion_provisoria,
  tabla_marcas, 
  onCardClick 
}) {

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(idafectacion); // Ejecutar la función con el idafectacion
    }
  };

  function getDuracion() {
    const fechaInicio = new Date(inicio);
    const fechaRestitucion = restitucion ? new Date(restitucion) : new Date();
    const diferenciaMs = fechaRestitucion - fechaInicio;
    const duracionHoras = Math.floor(diferenciaMs / (1000 * 60 * 60));
    return duracionHoras+3;
  }

  // Verificar si la marca "BAJA POTENCIAL" está presente
  const esBajaPotencial = marcas.some(marca => marca.marca === "BAJA POTENCIAL");
  const esNormalizado = restitucion!==null;
  const esSeguimiento = ["SEGUIMIENTO", "RELLAMAR"].includes(gestion);
  const esProvisorio = ["CON SUMINISTRO", "SE TRASLADA", "CON AUTONOMÍA", "GE INSTALADO"].includes(gestion);

  return (
    <div 
      className={`afectado-card ${
        esSeguimiento ? 'seguimiento' :
        esNormalizado ? 'normalizado' :
        esProvisorio  ? 'provisorio'  :
        esBajaPotencial ? 'baja-potencial' : ''
      }`} 
      onClick={handleClick}
    >
      <div className="afectado-header">
        <div className="afectado-id">{afectacion}</div>
        <div className="afectado-origen">{tipo}</div>
        <div className="afectado-ct">CT {ct}</div>
        <div className="afectado-cuenta">Cuenta: {cuenta}</div>
        <div className="afectado-estado">Estado: {estado}</div>
        <div className="afectado-gestion">Gestión: {gestion}</div>
      </div>
      <div className="afectado-body">
        <div className="afectado-duracion">Duracion: {getDuracion()} hs</div>
        <div className="afectado-reclamos">Reclamos: {cant_reclamos}</div>
        <div className="afectado-reiteraciones">Reiteraciones: {cant_reiteraciones}</div>
        <div className="afectado-opciones">
          <div className="afectado-icono reclamos" title="RECLAMOS">{cant_reclamos>0 ? cant_reclamos : ''}</div>
          <div className="afectado-icono reiteraciones" title="REITERACIONES">{cant_reiteraciones>0 ? cant_reiteraciones : ''}</div>
          <div className="afectado-icono fae" title="FAE">{fae ? 'FAE' : ''}</div>
          <div className="afectado-icono ge_propio" title="GE Propio">{ge_propio ? 'GE' : ''}</div>
          <div className="afectado-icono ami" title="AMI">{ami ? 'AMI' : ''}</div>
        </div>
      </div>
    </div>
  );
}

export default Afectado;
