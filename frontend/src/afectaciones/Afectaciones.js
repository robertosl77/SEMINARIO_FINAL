import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import LeftPanel from './Panel_Izquierdo';
import Footer from '../footer/Footer';
import ListaAfectaciones from './ListaAfectaciones';
import ListaReclamos from './ListaReclamos';
import './css/Afectaciones.css';
import ListaAparatologia from './ListaAparatologia';
import ListaContactos from './ListaContactos';

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedAfectaciones, setSelectedAfectaciones] = useState(null);
  const [selectedReclamos, setSelectedReclamos] = useState(null);
  const [selectedAparatologias, setSelectedAparatologia] = useState(null);
  const [selectedContactos, setSelectedContacto] = useState(null);

  const handleCardClick = (afectaciones, reclamos, aparatologias, contactos) => {
    setSelectedAfectaciones(afectaciones);
    setSelectedReclamos(reclamos);
    setSelectedAparatologia(aparatologias);
    setSelectedContacto(contactos);
  };

  return (
    <div>
      <Navbar />  
      <Dashboard setData={setData} />
      <div id="content">
        <LeftPanel data={data} onCardClick={handleCardClick} />
        <div id="right-panel">
          <div id="right-panel-1">
            Right Panel #1
          </div>
          <div id="right-panel-2">
            {selectedContactos && <ListaContactos contactos={selectedContactos} />}
            {selectedAparatologias && <ListaAparatologia aparatologias={selectedAparatologias} />}
            {selectedAfectaciones && <ListaAfectaciones data={selectedAfectaciones} />}
            {selectedReclamos && <ListaReclamos reclamos={selectedReclamos} />}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>   
      <Footer /> 
    </div>
  );
}

export default Afectaciones;
