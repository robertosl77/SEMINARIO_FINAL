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
import ListaMarcas from './ListaMarcas';
import ListaTelefonos from './ListaTelefonos'

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedTelefonos, setSelectedTelefonos] = useState(null);
  const [selectedMarcas, setSelectedMarcas] = useState(null);
  const [selectedContactos, setSelectedContactos] = useState(null);
  const [selectedAparatologias, setSelectedAparatologias] = useState(null);
  const [selectedPacientes, setselectedPacientes] = useState(null);
  const [selectedAfectaciones, setSelectedAfectaciones] = useState(null);
  const [selectedReclamos, setSelectedReclamos] = useState(null);

  const handleCardClick = (telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos) => {
    setSelectedTelefonos(telefonos);
    setSelectedMarcas(marcas);
    setSelectedContactos(contactos);
    setSelectedAparatologias(aparatologias);
    setselectedPacientes(pacientes);
    setSelectedAfectaciones(afectaciones);
    setSelectedReclamos(reclamos);
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
            {selectedTelefonos && <ListaTelefonos telefonos={selectedTelefonos} />}
            {selectedMarcas && <ListaMarcas marcas={selectedMarcas} />}
            {selectedContactos && <ListaContactos contactos={selectedContactos} />}
            {selectedAparatologias && <ListaAparatologias aparatologias={selectedAparatologias} />}
            {selectedPacientes && <ListaPacientes pacientes={selectedPacientes} />}
            {selectedAfectaciones && <ListaAfectaciones afectaciones={selectedAfectaciones} />}
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
