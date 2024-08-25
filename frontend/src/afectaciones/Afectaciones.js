import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import LeftPanel from './Panel_Izquierdo';
import Footer from '../footer/Footer';
import './css/Afectaciones.css';

function Afectaciones() {
  const [data, setData] = useState(null);

  return (
    <div>
      <Navbar />
      <Dashboard setData={setData} />
      <div id="content">
        <LeftPanel data={data}/>
        <div id="right-panel">
          <div id="right-panel-1">
            Right Panel #1
          </div>
          <div id="right-panel-2">
            Right Panel #2 - Scrollable
          </div>
        </div>
      </div>   
      <Footer /> 
    </div>
  );
}

export default Afectaciones;
