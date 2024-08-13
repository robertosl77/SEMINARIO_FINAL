import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Manager from './afectaciones/Manager';  // Importa el componente Manager

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir desde la ruta raíz a /SGE/Login */}
        <Route path="/" element={<Navigate to="/SGE/Login" />} />
        <Route path="/SGE/Login" element={<Login />} />
        <Route path="/SGE/Manager" element={<Manager />} />  {/* Ruta para Manager */}
      </Routes>
    </Router>
  );
}

export default App;
