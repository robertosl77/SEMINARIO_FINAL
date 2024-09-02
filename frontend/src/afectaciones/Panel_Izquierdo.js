import React from 'react';
import Afectado from './Afectado';
import './css/Panel_Izquierdo.css';

function LeftPanel({ data, onCardClick }) {

  return (
    <div id="left-panel">
      {/* Verifica si hay datos de afectados */}
      {data && data.afectados && data.afectados.length > 0 ? (
        <div>
          {data.afectados.map((afectado, index) => (
            <Afectado
              key={index}
              afectacion={afectado.afectacion}
              afectaciones={afectado.afectaciones} // Pasa las afectaciones a Afectado.js
              ami={afectado.ami}
              aparatologia={afectado.aparatologia}
              cant_reclamos={afectado.cant_reclamos}
              cant_reiteraciones={afectado.cant_reiteraciones}
              contactos={afectado.contactos}
              ct={afectado.ct}
              cuenta={afectado.cuenta}
              estado={afectado.estado}
              fae={afectado.fae}
              ge_propio={afectado.ge_propio}
              gestion={afectado.gestion}
              idafectacion={afectado.idafectacion}
              inicio={afectado.inicio}
              marcas={afectado.marcas}
              pacientes={afectado.pacientes}
              reclamos={afectado.reclamos}
              restitucion={afectado.restitucion}
              telefonos={afectado.telefonos}
              tipo={afectado.tipo}
              solucion_provisoria={data.solucion_provisoria}
              tabla_marcas={data.marcas}
              onCardClick={onCardClick} // Pasa la función para manejar el clic en la tarjeta
            />
          ))}
        </div>
      ) : (
        <p>No hay datos de afectados disponibles.</p>
      )}
    </div>
  );
}

export default LeftPanel;
