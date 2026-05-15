import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';


export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth(); // <-- Toda la lógica viene de aquí

  const handleSubmit = (e) => {
    e.preventDefault();
    login(usuario, password);
  };

  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2>¡Bienvenido! 👋</h2>
        <p>Ingresa a tu cuenta para tomar asistencia</p>
        
        <form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            placeholder="Usuario" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <Input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p style={{ color: 'var(--error-color)', fontSize: '14px' }}>{error}</p>}

          <Button type="submit" className="login-btn">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}