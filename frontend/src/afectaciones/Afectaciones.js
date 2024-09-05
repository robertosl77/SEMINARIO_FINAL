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
import GestionSolucion from './gestiones/GestionSolucion';
import GestionNota from './gestiones/GestionNota';
import './css/Afectaciones.css';
import './css/Listas.css'

function Afectaciones() {
  const [data, setData] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [gestionData, setGestionData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showContacto, setShowContacto] = useState(1); // Estado para controlar la pestaña activa

  const handleCardClick = (telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos, cuenta, idafectacion, solucion_provisoria) => {
    setVisible(false);

    setTimeout(() => {
      setSelectedView({ telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos });
      setGestionData({ cuenta, solucion_provisoria, telefonos, idafectacion });
      setVisible(true);
    }, 300);
  };

  // Función para manejar el cambio de pestaña
  const handleTabClick = (tabIndex) => {
    setShowContacto(tabIndex); // Actualizar el estado para cambiar entre Solución Provisoria y Contacto
  };

  return (
    <div>
      <Navbar />  
      <Dashboard setData={setData} />
      <div id="content">
        <LeftPanel data={data} onCardClick={handleCardClick} />
        <div id="right-panel">
            <div id="boton" onClick={() => handleTabClick(1)}>Solución Provisoria</div>
            <div id="boton" onClick={() => handleTabClick(2)}>Nota</div>
            <div id="boton" onClick={() => handleTabClick(3)}>Contacto</div>
            <div id="right-panel-1">

            <div className="solucionProvisoria">
              {showContacto === 1 && gestionData && (
                <GestionSolucion
                  {...gestionData}
                  solucion_provisoria={data?.solucion_provisoria || []} 
                  onGestionChange={(nuevaSolucion) => {
                    const updatedData = data.afectados.map(afectado =>
                      afectado.cuenta === gestionData.cuenta
                        ? { ...afectado, solucion_provisoria: nuevaSolucion }
                        : afectado
                    );
                    setData({ ...data, afectados: updatedData });
                  }}
                />
              )}
            </div>

            {showContacto === 2 && (
              <div className="solucionNota">
                <GestionNota {...gestionData} />
              </div>
            )}

            {showContacto === 3 && (
              <div className="solucionContacto">
                contacto testing
              </div>
            )}

            {showContacto === 4 && (
              <div className="solucionOtros">
                contacto testing
              </div>
            )}

          </div>
          <div id="right-panel-2">
            <div className={`vista ${visible && selectedView?.telefonos ? 'mostrar' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <ListaTelefonos telefonos={selectedView?.telefonos} />
            </div>
            <div className={`vista ${visible && selectedView?.marcas ? 'mostrar' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <ListaMarcas marcas={selectedView?.marcas} />
            </div>
            <div className={`vista ${visible && selectedView?.contactos ? 'mostrar' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <ListaContactos contactos={selectedView?.contactos} />
            </div>
            <div className={`vista ${visible && selectedView?.aparatologias ? 'mostrar' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <ListaAparatologias aparatologias={selectedView?.aparatologias} />
            </div>
            <div className={`vista ${visible && selectedView?.pacientes ? 'mostrar' : ''}`} style={{ transitionDelay: '0.5s' }}>
              <ListaPacientes pacientes={selectedView?.pacientes} />
            </div>
            <div className={`vista ${visible && selectedView?.afectaciones ? 'mostrar' : ''}`} style={{ transitionDelay: '0.6s' }}>
              <ListaAfectaciones afectaciones={selectedView?.afectaciones} />
            </div>
            <div className={`vista ${visible && selectedView?.reclamos ? 'mostrar' : ''}`} style={{ transitionDelay: '0.7s' }}>
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
