import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Afectaciones from './afectaciones/Afectaciones'
import Climatica from './climatica/Climatica';
import Clientes from './clientes/Clientes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirigir desde la ruta raíz a /SGE/Login */}
        <Route path="/" element={<Navigate to="/SGE/Login" />} />
        <Route path="/SGE/Login" element={<Login />} />
        <Route path="/SGE/Afectaciones" element={<Afectaciones />} />
        <Route path="/SGE/Climatica" element={<Climatica />} />
        <Route path="/SGE/Clientes" element={<Clientes />} />
        <Route path="*" element={<Navigate to="/SGE/Login" />} /> {/* Redirección de rutas inexistentes */}
      </Routes>
    </Router>
  );
}

export default App;
