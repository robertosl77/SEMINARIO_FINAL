import React, { useState } from 'react';
import './css/Login.css';  // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';  // Importa useNavigate


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/SGE/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      // alert('Login successful');
      sessionStorage.setItem('username', data.user.username);
      sessionStorage.setItem('rol', data.user.rol);
      navigate('/SGE/Manager');  // Redirige a la página Manager
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
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
    </div>
  );
}

export default Login;
