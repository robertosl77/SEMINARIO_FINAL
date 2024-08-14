import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  const navigate = useNavigate();  // Hook para redirigir

  const handleLogout = async () => {
    // Realiza la solicitud al backend para desloguear
    const response = await fetch('http://localhost:5000/SGE/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      navigate('/SGE/Login');  // Redirige al login después de desloguear
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo de la Facultad" />
      </div>
      <span className="navbar-title">Sistema de Gestión para Electrodependientes</span> {/* Aquí agregas el título */}
      <ul className="navbar-links">
        <li><Link to="/SGE/Manager">Manager</Link></li>
        <li><Link to="/SGE/Climatica">Climatica</Link></li>
        {/* Aquí hacemos que el logout se maneje con un <li> */}
        <li className="logout-link" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
