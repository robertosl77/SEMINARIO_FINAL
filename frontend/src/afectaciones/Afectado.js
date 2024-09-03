import React from 'react';
import './css/Afectado.css';

function Afectado({
  afectacion,
  afectaciones,
  ami,
  aparatologias,
  cant_reclamos,
  cant_reiteraciones,
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
  tabla_marcas,
  onCardClick 
}) {

  const handleclick = () => {
    if (onCardClick) {
      onCardClick(telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos);  // Pasar las dos variables al componente principal
    }
  };

  // Verificar si la marca "BAJA POTENCIAL" está presente
  const esBajaPotencial = marcas.some(marca => marca.marca === "BAJA POTENCIAL");
  const esNormalizado = restitucion !== null;
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
      // onMouseEnter={handleMouseEnter}  // Agrega el evento onMouseEnter
      onClick={handleclick}
    >
      <div className="afectado-header">
        <div className="afectado-id">{afectacion}</div>
        <div className="afectado-origen">{tipo}</div>
        <div className="afectado-ct">CT {ct}</div>
        <div className="afectado-cuenta">Cuenta: {cuenta}</div>
        <div className="afectado-estado">Estado: {estado}</div>
        <div className="afectado-gestion">{gestion}</div>
      </div>
      <div className="afectado-body">
        <div className="afectado-etiquetas">
          <div className="afectado-afectaciones">Afectaciones: {afectaciones.length}</div>
          <div className="afectado-reclamos">Reclamos: {cant_reclamos}</div>
          <div className="afectado-reiteraciones">Reiteraciones: {cant_reiteraciones}</div>
          <div className="afectado-aparatologias">Aparatologias: {aparatologias.length}</div>
          <div className="afectado-telefonos">Telefonos: {telefonos.length}</div>
        </div>
        <div className="afectado-opciones">
          <div className={fae===0 ? "afectado-icono fae_off" : "afectado-icono fae"} title="FAE">{fae ? 'FAE' : ''}</div>
          <div className={ge_propio===0 ? "afectado-icono ge_propio_off" : "afectado-icono ge_propio"} title="GE Propio">{ge_propio ? 'GE' : ''}</div>
          <div className={ami===0 ? "afectado-icono ami_off" : "afectado-icono ami"} title="AMI">{ami ? 'AMI' : ''}</div>
        </div>
      </div>
    </div>
  );
}

export default Afectado;
