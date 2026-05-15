import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCursos from '../hooks/useCursos';
import Navbar from '../components/Navbar';
import DataTable from '../components/DataTable';
import Input from '../components/Input';
import Button from '../components/Button';


export default function Cursos() {
  const { cursos, loading, agregarCurso } = useCursos();
  const [nuevoNombre, setNuevoNombre] = useState('');
  const navigate = useNavigate();

  const handleGuardar = async (e) => {
    e.preventDefault();
    const resultado = await agregarCurso(nuevoNombre);
    if (resultado.success) {
      setNuevoNombre('');
    } else {
      alert("Error al crear la clase");
    }
  };

  // Definimos las cabeceras de la tabla
  const headers = ['ID', 'Nombre', 'Profesor',  'Acciones'];

  // Definimos cómo se ve cada fila
  const renderRow = (curso) => (
    <>
      <td style={{ padding: '12px' }}>{curso.idClase}</td>
      <td style={{ padding: '12px' }}><strong>{curso.nombre}</strong></td>
      <td style={{ padding: '12px' }}>
        {curso.profesor ? `Profesor #${curso.profesor.idProfesor}` : 'Sin asignar'}
      </td>
      
      <td style={{ padding: '12px' }}>
        <Button 
          style={{ backgroundColor: '#10b981', padding: '6px 12px', fontSize: '12px' }}
          onClick={() => navigate(`/estudiantes/${curso.idClase}`)}
        >
          Ver Estudiantes
        </Button>
      </td>
    </>
  );

  return (
    <div className="pagina-fondo">
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-dark)' }}>Gestión de Clases 📚</h2>

        {/* Sección Crear */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Registrar Nueva Clase</h3>
          <form onSubmit={handleGuardar} style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <Input 
                placeholder="Nombre (Ej. Matemáticas 101)" 
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                required
              />
            </div>
            <div style={{ width: '200px' }}>
              <Button type="submit">Guardar Clase</Button>
            </div>
          </form>
        </div>

        {/* Sección Tabla */}
        <div className="card">
          <h3>Mis Clases</h3>
          {loading ? (
            <p>Cargando clases...</p>
          ) : (
            <DataTable 
              headers={headers} 
              data={cursos} 
              renderRow={renderRow} 
            />
          )}
        </div>
      </div>
    </div>
  );
}