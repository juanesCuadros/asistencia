// src/pages/Cursos.jsx
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCursos } from '../hooks/useCursos';
import './Curso.css';

export default function Cursos() {
  const navigate = useNavigate();
  const { cursos, nombre, setNombre, mensaje, handleCrearCurso } = useCursos();

  return (
    <div className="pagina-fondo">
      <Navbar />
      <div className="cursos-container">
        <h2 className="cursos-titulo">Gestión de Clases 📚</h2>

        <div className="cursos-card">
          <h3>Registrar Nueva Clase</h3>
          {mensaje && <p className="mensaje-feedback">{mensaje}</p>}
          <form onSubmit={handleCrearCurso} className="form-crear-curso">
            <input
              type="text"
              placeholder="Nombre (Ej. Matemáticas 101)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="btn-guardar">
              Guardar Clase
            </button>
          </form>
        </div>

        <div className="cursos-card">
          <h3>Mis Clases</h3>
          <table className="tabla-cursos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Profesor Asignado</th>
                <th>Estudiantes Inscritos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="mensaje-vacio">
                    No hay clases registradas. ¡Crea la primera!
                  </td>
                </tr>
              ) : (
                cursos.map((curso) => (
                  <tr key={curso.idClase}>
                    <td>{curso.idClase}</td>
                    <td><strong>{curso.nombre}</strong></td>
                    <td>{curso.profesor ? `Profesor #${curso.profesor.idProfesor}` : 'Sin asignar'}</td>
                    <td>{curso.estudiantes?.length ?? 0}</td>
                    <td>
                      <button
                        className="btn-ver-estudiantes"
                        onClick={() => navigate(`/estudiantes/${curso.idClase}`)}
                      >
                        Ver Estudiantes / Asistencia
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}