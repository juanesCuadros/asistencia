import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../services/authService';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (nombreUsuario, contrasena) => {
    setLoading(true);
    setError('');
    try {
      const respuesta = await iniciarSesion(nombreUsuario, contrasena);
      if (respuesta.mensaje === "Login exitoso") {
        navigate('/cursos');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}