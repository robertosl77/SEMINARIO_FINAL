import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import LeftPanel from './Panel_Izquierdo';
import Footer from '../footer/Footer';
import ListaAfectaciones from './ListaAfectaciones';
import ListaReclamos from './ListaReclamos';
import './css/Afectaciones.css';

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedAfectaciones, setSelectedAfectaciones] = useState(null);
  const [selectedReclamos, setSelectedReclamos] = useState(null);

  const handleCardClick = (afectaciones, reclamos) => {
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
            {selectedAfectaciones && <ListaAfectaciones data={selectedAfectaciones} />}
            {selectedReclamos && <ListaReclamos reclamos={selectedReclamos} />}
          </div>
        </div>
      </div>   
      <Footer /> 
    </div>
  );
}

export default Afectaciones;
