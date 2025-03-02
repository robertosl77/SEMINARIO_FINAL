import React, { useState } from 'react';
import Navbar from '../navegacion/Navbar';
import Dashboard from './Dashboard';
import Afectados from './Afectados';
import Footer from '../footer/Footer';
import ModalPanel from './ModalPanel';
import ListaAfectaciones from './detalle/ListaAfectaciones';
import ListaReclamos from './detalle/ListaReclamos';
import ListaAparatologias from './detalle/ListaAparatologias';
import ListaContactos from './detalle/ListaContactos';
import ListaPacientes from './detalle/ListaPacientes';
import ListaMarcas from './detalle/ListaMarcas';
import ListaTelefonos from './detalle/ListaTelefonos';
import GestionContacto from './gestiones/GestionContacto';
import ModalPanelControl from './ModalPanelControl'; // Importa el componente si no está importado
import './css/Listas.css';
import './css/Gestion.css'
import './css/objeto_boton.css'
import './css/objeto_SwitchStyle.css'

function Afectaciones() {
  // const username = sessionStorage.getItem('username');
  const rol = sessionStorage.getItem('rol');
  const [data, setData] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [gestionData, setGestionData] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleCardClick = (telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos, cuenta, idafectacion, solucion_provisoria) => {
    setVisible(false);

    setTimeout(() => {
      setSelectedView({ telefonos, marcas, contactos, aparatologias, pacientes, afectaciones, reclamos });
      setGestionData({ cuenta, solucion_provisoria, telefonos, idafectacion });
      setVisible(true);
    }, 300);
  };

  if (visible) {
    document.body.classList.add("panel-abierto");
  } else {
    document.body.classList.remove("panel-abierto");
  }
  
  return (
    <div>
      <Navbar />  
      <Dashboard setData={setData} />
      <Afectados data={data} onCardClick={handleCardClick} />
      <ModalPanelControl isVisible={visible} onClose={() => setVisible(false)} />
      <ModalPanel isVisible={visible} onClose={() => setVisible(false)}>
        <div>
          <div>
            {rol!=='consulta' && (
            <div className="solucionContacto">
              <GestionContacto 
                {...gestionData}
                solucion_provisoria={data?.solucion_provisoria || []} 
                onGestionChange={(nuevaGestion) => {
                  const updatedData = data.afectados.map(afectado =>
                    afectado.cuenta === gestionData.cuenta
                      ? { ...afectado, gestion: nuevaGestion } // Asegúrate de que se actualice `gestion`
                      : afectado
                  );
                  setData({ ...data, afectados: updatedData });
                }}
                
              />
            </div>
            )}

          </div>
          <div>
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
      </ModalPanel>
      <Footer /> 
    </div>
  );
}

export default Afectaciones;
