import React, { useState } from 'react';
import Afectado from './Afectado';
import './css/Afectados.css';

function Afectados({ data, onCardClick }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = (cuenta, ...otherProps) => {
    setSelectedId(cuenta); // Mantiene `selectedId` al hacer clic
    onCardClick(...otherProps);
  };

  return (
    <div id="content">
      {data && data.afectados && data.afectados.length > 0 ? (
        <div>
          {data.afectados.map((afectado, index) => (
            <Afectado
              key={index}
              afectacion={afectado.afectacion}
              idafectacion={afectado.idafectacion}
              afectaciones={afectado.afectaciones}
              ami={afectado.ami}
              aparatologias={afectado.aparatologia}
              cant_reclamos={afectado.cant_reclamos}
              cant_reiteraciones={afectado.cant_reiteraciones}
              cliente={afectado.cliente}
              contactos={afectado.contactos}
              ct={afectado.ct}
              cuenta={afectado.cuenta}
              estado={afectado.estado}
              fae={afectado.fae}
              ge_propio={afectado.ge_propio}
              gestion={afectado.gestion}
              inicio={afectado.inicio}
              marcas={afectado.marcas}
              pacientes={afectado.pacientes}
              reclamos={afectado.reclamos}
              restitucion={afectado.restitucion}
              telefonos={afectado.telefonos}
              tipo={afectado.tipo}
              solucion_provisoria={afectado.solucion_provisoria}
              onCardClick={(...props) => handleCardClick(afectado.cuenta, ...props)}
              isSelected={selectedId === afectado.cuenta} // Indica si el afectado está seleccionado
            />
          ))}
          <br /><br /><br /><br />
        </div>
      ) : (
        <p>No hay datos de afectados disponibles.</p>
      )}
    </div>
  );
}

export default Afectados;
