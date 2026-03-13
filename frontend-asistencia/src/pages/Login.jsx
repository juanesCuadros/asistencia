// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService'; // <-- Importamos tu servicio
import './Login.css'; 

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState(''); // Para mostrar errores en pantalla
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensajeError(''); // Limpiamos errores previos

    try {
      // 1. Llamamos a tu backend enviando lo que el usuario escribió
      const respuesta = await iniciarSesion(usuario, password);

      // 2. Si el backend responde éxito, lo dejamos pasar
      if (respuesta.mensaje === "Login exitoso") {
        navigate('/cursos'); // O la ruta a la que quieras enviarlo
      }
    } catch (error) {
      // 3. Si las credenciales son incorrectas, mostramos el error del backend
      setMensajeError(error.message);
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
          
          {/* Si hay un error, lo mostramos aquí en rojo */}
          {mensajeError && <p style={{color: 'red', fontSize: '14px', margin: '5px 0'}}>{mensajeError}</p>}

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}