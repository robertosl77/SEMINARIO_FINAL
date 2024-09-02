import React from 'react';
import Afectado from './Afectado';
import './css/Panel_Izquierdo.css';

function LeftPanel({ data }) {

  const handleCardClick = (idafectacion) => {
    // console.log("Card clicked with ID:", idafectacion);
    // Aquí puedes realizar cualquier acción con el idafectacion, como navegar a otra vista o mostrar más información.
  };

  return (
    <div id="left-panel">
      {/* Verifica si hay datos de afectados */}
      {data && data.afectados && data.afectados.length > 0 ? (
        <div>
          {data.afectados.map((afectado, index) => (
            <Afectado
              key={index}
              afectacion={afectado.afectacion}
              afectaciones={afectado.afectaciones}
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
              onCardClick={handleCardClick}
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
