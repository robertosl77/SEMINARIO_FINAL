import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import LeftPanel from './Panel_Izquierdo';
import Footer from '../footer/Footer';
import ListaAfectaciones from './ListaAfectaciones';
import ListaReclamos from './ListaReclamos';
import ListaAparatologias from './ListaAparatologias';
import ListaContactos from './ListaContactos';
import ListaPacientes from './ListaPacientes';
import ListaMarcas from './ListaMarcas';
import ListaTelefonos from './ListaTelefonos';
import './css/Afectaciones.css';

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleCardClick = (telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos) => {
    // Ocultar todas las vistas primero
    setVisible(false);

    setTimeout(() => {
      // Luego de un pequeño retraso, actualizar la vista seleccionada y mostrarla
      setSelectedView({ telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos });
      setVisible(true);
    }, 300); // 300ms es el tiempo de la transición de salida
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
            <div className={`vista ${visible && selectedView?.telefonos ? 'mostrar' : ''}`}>
              <ListaTelefonos telefonos={selectedView?.telefonos} />
            </div>
            <div className={`vista ${visible && selectedView?.marcas ? 'mostrar' : ''}`}>
              <ListaMarcas marcas={selectedView?.marcas} />
            </div>
            <div className={`vista ${visible && selectedView?.contactos ? 'mostrar' : ''}`}>
              <ListaContactos contactos={selectedView?.contactos} />
            </div>
            <div className={`vista ${visible && selectedView?.aparatologias ? 'mostrar' : ''}`}>
              <ListaAparatologias aparatologias={selectedView?.aparatologias} />
            </div>
            <div className={`vista ${visible && selectedView?.pacientes ? 'mostrar' : ''}`}>
              <ListaPacientes pacientes={selectedView?.pacientes} />
            </div>
            <div className={`vista ${visible && selectedView?.afectaciones ? 'mostrar' : ''}`}>
              <ListaAfectaciones afectaciones={selectedView?.afectaciones} />
            </div>
            <div className={`vista ${visible && selectedView?.reclamos ? 'mostrar' : ''}`}>
              <ListaReclamos reclamos={selectedView?.reclamos} />
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>   
      <Footer /> 
    </div>
  );
}

export default Afectaciones;
