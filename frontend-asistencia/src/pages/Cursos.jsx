// src/pages/Cursos.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { obtenerClases, crearClase } from '../services/cursosService';
import './Curso.css'; 

export default function Cursos() {
  const [cursos, setClases] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    cargarCursos();
  }, []);
  const navigate = useNavigate();

  const cargarCursos = async () => {
    try {
      const data = await obtenerClases();
      // 👇 ¡Esta línea es la clave! Nos dirá qué llega realmente
      console.log("Datos que llegaron del backend:", data); 
      setClases(data);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    }
  };

  const handleCrearCurso = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('Por favor ingresa el nombre de la clase');
      return;
    }

    try {
      const nuevoCurso = { 
        nombre: nombre,
        profesor: { idProfesor: 1 } 
      };
      
      // 1. Guardamos y RECIBIMOS la clase confirmada por el backend
      const claseGuardada = await crearClase(nuevoCurso);
      
      // 2. Limpiamos el input
      setNombre(''); 
      
      // 3. ¡LA MAGIA! Agregamos la clase nueva a la lista que ya tenemos en pantalla
      setClases([...cursos, claseGuardada]); 

      alert('¡Clase creada con éxito!');

    } catch (error) {
      alert('Hubo un error al crear la clase');
      console.error(error);
    }
  };

  return (
    <div className="pagina-fondo">
      <Navbar />
      <div className="cursos-container">
        <h2 className="cursos-titulo">Gestión de Clases 📚</h2>

        {/* Formulario */}
        <div className="cursos-card">
          <h3>Registrar Nueva Clase</h3>
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

        {/* Tabla */}
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
              {cursos.map((curso) => (
                <tr key={curso.idClase}>
                  <td>{curso.idClase}</td>
                  <td><strong>{curso.nombre}</strong></td>
                  {/* Validamos si trae el profesor para mostrar su ID o nombre */}
                  <td>{curso.profesor ? `Profesor #${curso.profesor.idProfesor}` : 'Sin asignar'}</td>
                  <td>{curso.estudiantes ? curso.estudiantes.length : 0}</td>
                  <td>
                    <button 
                        className="btn-ver-estudiantes"
                        onClick={() => navigate(`/estudiantes/${curso.idClase}`)}
                      >
                        Ver Estudiantes / Asistencia
                      </button>
                  </td>
                </tr>
              ))}
              {cursos.length === 0 && (
                <tr>
                  <td colSpan="5" className="mensaje-vacio">
                    No hay clases registradas. ¡Crea la primera!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}