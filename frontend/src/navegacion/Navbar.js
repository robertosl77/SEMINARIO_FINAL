import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Cambia Link por NavLink
import './css/Navbar.css';
import logo from './img/logo.png';

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const rol = sessionStorage.getItem('rol');

  const handleLogout = async () => {
    const response = await fetch('https://seminario-final.onrender.com/SGE/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      sessionStorage.clear();
      navigate('/SGE/Login');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const titleElement = document.querySelector('.navbar-title');
    if (!titleElement) return;

    const updateTitle = () => {
      titleElement.textContent = window.innerWidth <= 1200 ? "SGE" : "Sistema de Gestión para Electrodependientes";
    };

    updateTitle();
    window.addEventListener('resize', updateTitle);

    return () => window.removeEventListener('resize', updateTitle);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 520) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        <button className="hamburger-menu" onClick={toggleMobileMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          {['admin', 'operador', 'consulta'].includes(rol) && (
            <li>
              <NavLink to="/SGE/Afectaciones">Afectaciones</NavLink>
            </li>
          )}
          {['admin', 'operador'].includes(rol) && (
            <li>
              <NavLink to="/SGE/Climatica">Condiciones Climaticas</NavLink>
            </li>
          )}
          {['admin'].includes(rol) && (
            <li>
              <NavLink to="/SGE/Clientes">Clientes</NavLink>
            </li>
          )}
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