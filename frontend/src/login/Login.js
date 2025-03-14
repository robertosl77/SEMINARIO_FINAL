import React, { useState } from 'react';
import './css/Login.css';  // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_API_URL);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/SGE/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      sessionStorage.setItem('username', data.user.username);
      sessionStorage.setItem('rol', data.user.rol);
      navigate('/SGE/Afectaciones');  // Redirige a la página Afectaciones
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-background">
          <div className="login-content">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button type="submit">Login</button>
            </form>
            <div className="login-version-info">
              <p>Frontend Version: 1.9.21</p>
              <p>Backend Version: 1.7.6</p>
            </div>
            <div className="login-additional-info">
              <p>Autor: Roberto Sanchez Leiva</p>
              <p>Legajo: VINF012641</p>
              <p>Carrera: Licenciatura en Informática - Siglo 21</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
