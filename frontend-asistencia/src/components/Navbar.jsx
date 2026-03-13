// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token'); // Borramos la "manilla VIP"
    navigate('/'); // Lo devolvemos al Login
  };

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px', backgroundColor: '#2c3e50', color: 'white' }}>
      <Link to="/estudiantes" style={{ color: 'white', textDecoration: 'none' }}>Estudiantes</Link>
      <button onClick={cerrarSesion} style={{ marginLeft: 'auto', cursor: 'pointer' }}>
        Cerrar Sesión
      </button>
    </nav>
  );
}