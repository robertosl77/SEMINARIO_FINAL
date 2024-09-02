import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import LeftPanel from './Panel_Izquierdo';
import Footer from '../footer/Footer';
import ListaAfectaciones from './ListaAfectaciones';
import ListaReclamos from './ListaReclamos';
import './css/Afectaciones.css';
import ListaAparatologias from './ListaAparatologias';
import ListaContactos from './ListaContactos';
import ListaPacientes from './ListaPacientes';

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedAfectaciones, setSelectedAfectaciones] = useState(null);
  const [selectedReclamos, setSelectedReclamos] = useState(null);
  const [selectedAparatologias, setSelectedAparatologias] = useState(null);
  const [selectedContactos, setSelectedContactos] = useState(null);
  const [selectedPacientes, setSelectedPacientes] = useState(null);

  const handleCardClick = (afectaciones, reclamos, aparatologias, contactos, pacientes) => {
    setSelectedAfectaciones(afectaciones);
    setSelectedReclamos(reclamos);
    setSelectedAparatologias(aparatologias);
    setSelectedContactos(contactos);
    setSelectedPacientes(pacientes);
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
            {selectedAparatologias && <ListaAparatologias aparatologias={selectedAparatologias} />}
            {selectedPacientes && <ListaPacientes pacientes={selectedPacientes} />}
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
