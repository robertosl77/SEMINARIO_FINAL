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
              idafectacion={afectado.idafectacion}
              afectacion={afectado.afectacion}
              tipo={afectado.tipo}
              estado={afectado.estado}
              ct={afectado.ct}
              inicio={afectado.inicio}
              restitucion={afectado.restitucion}
              cuenta={afectado.cuenta}
              gestion={afectado.gestion}
              fae={afectado.fae}
              ami={afectado.ami}
              ge_propio={afectado.ge_propio}
              cant_reclamos={afectado.cant_reclamos}
              cant_reiteraciones={afectado.cant_reiteraciones}
              aparatologia={afectado.aparatologia}
              telefonos={afectado.telefonos}
              reclamos={afectado.reclamos}
              marcas={afectado.marcas}
              contactos={afectado.contactos}
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
