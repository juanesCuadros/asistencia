// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // <-- Importamos el nuevo diseño

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí luego puedes validar con el backend
    if (usuario === 'admin' && password === '1234') {
      navigate('/estudiantes'); 
    } else {
      alert('Credenciales incorrectas (Usa admin / 1234)');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">¡Bienvenido! 👋</h2>
        <p className="login-subtitle">Ingresa a tu cuenta para tomar asistencia</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="text" 
            className="login-input"
            placeholder="Usuario" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input 
            type="password" 
            className="login-input"
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}