import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';  // Asegúrate de que Login.js existe en la misma carpeta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/SGE/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
