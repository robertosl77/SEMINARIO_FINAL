import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);  // Estado para manejar el menú desplegable
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const rol = sessionStorage.getItem('rol');
  
  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/SGE/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      sessionStorage.clear();  // Limpiar el sessionStorage al desloguearse
      navigate('/SGE/Login');  // Redirige al login después de desloguear
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const titleElement = document.querySelector('.navbar-title');
    if (!titleElement) return;
  
    const updateTitle = () => {
      titleElement.textContent = window.innerWidth <= 965 ? "SGE" : "Sistema de Gestión para Electrodependientes";
    };
  
    updateTitle(); // Ejecuta al cargar
    window.addEventListener('resize', updateTitle); // Detecta cambios de tamaño
  
    return () => window.removeEventListener('resize', updateTitle); // Limpieza
  }, []);  

  return (
    <nav className="navbar">
      <div className="navbar-title-group">
        <div className="navbar-logo">
          <img src={logo} alt="Logo de la Facultad" />
        </div>
        <div>
          <span className="navbar-title">Sistema de Gestión para Electrodependientes</span>
        </div>
      </div>
      <div>
        <ul className="navbar-links">
          {['admin', 'operador', 'consulta'].includes(rol) && <li><Link to="/SGE/Afectaciones">Afectaciones</Link></li>}
          {['admin', 'operador'].includes(rol) && <li><Link to="/SGE/Climatica">Climatica</Link></li>}
          {['admin'].includes(rol) && <li><Link to="/SGE/Clientes">Clientes</Link></li>}
          <li className="user-dropdown" onClick={toggleDropdown}>
            {username}
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
