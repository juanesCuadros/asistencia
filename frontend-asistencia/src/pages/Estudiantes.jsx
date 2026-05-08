// src/pages/Estudiantes.jsx
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEstudiantes } from '../hooks/useEstudiantes'; // 👈 único import nuevo
import './Estudiantes.css';

export default function Estudiantes() {
  const { idClase } = useParams();

  const {
    estudiantes, cargando, error,
    nombreEstudiante, setNombreEstudiante,
    codigo, setCodigo, guardando, handleCrear,
    fecha, setFecha,
    asistenciasMarcadas, registrarAsistenciaRapida, exportarReporteCSV,
  } = useEstudiantes(idClase); // 👈 toda la lógica en una línea

  return (
    <div className="estudiantes-page">
      <Navbar />
      {/* ...el JSX queda exactamente igual que antes... */}
    </div>
  );
}