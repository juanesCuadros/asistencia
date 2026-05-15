import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService';
import './Login.css';

export default function Login() {
  const [usuario, setUsuario]           = useState('');
  const [password, setPassword]         = useState('');
  const [mensajeError, setMensajeError] = useState('');
  
  const [cargando, setCargando]         = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensajeError('');
    setCargando(true);

    try {
      const respuesta = await iniciarSesion(usuario, password);

      if (respuesta.token || respuesta.success) {
        navigate('/cursos');
      }
    } catch (error) {
      setMensajeError(error.message);
    } finally {
      setCargando(false);
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
            autoComplete="username"
            required
          />

          <input
            type="password"
            className="login-input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {mensajeError && (
            <p className="login-error">{mensajeError}</p>
          )}
          <button
            type="submit"
            className="login-btn"
            disabled={cargando}
          >
            {cargando ? 'Entrando...' : 'Entrar'}
          </button>

        </form>
      </div>
    </div>
  );
}