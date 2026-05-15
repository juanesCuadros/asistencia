import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useEstudiantes from '../hooks/useEstudiantes';
import Navbar from '../components/Navbar';
import DataTable from '../components/DataTable';
import Input from '../components/Input';
import Button from '../components/Button';


export default function Estudiantes() {
  const { idClase } = useParams();
  const { 
    estudiantes, loading, error, fecha, setFecha, asistenciasMarcadas, 
    agregarYMatricularEstudiante, registrarAsistenciaRapida, exportarReporteCSV 
  } = useEstudiantes(idClase);

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !codigo.trim()) return;
    setGuardando(true);
    const result = await agregarYMatricularEstudiante(codigo, nombre);
    if (result.success) {
      setCodigo('');
      setNombre('');
    } else {
      alert("Hubo un error al matricular al estudiante");
    }
    setGuardando(false);
  };

  // --- CONFIGURACIÓN DE LA TABLA ---
  const headers = ['Código', 'Nombre del Estudiante', 'Marcar Asistencia'];

  const renderRow = (est) => {
    const idEst = est.idEstudiante || est.id || est.id_estudiante;
    const estadoYaMarcado = asistenciasMarcadas[idEst];

    return (
      <>
        <td style={{ padding: '12px', fontWeight: 'bold' }}>{est.codigo}</td>
        <td style={{ padding: '12px' }}>{est.nombreEstudiante || est.nombre_estudiante}</td>
        <td style={{ padding: '12px' }}>
          {estadoYaMarcado ? (
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Registrado ({estadoYaMarcado})</span>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button style={{ backgroundColor: '#10b981', padding: '6px' }} onClick={() => registrarAsistenciaRapida(est, 'PRESENTE')}>Presente</Button>
              <Button style={{ backgroundColor: '#f59e0b', padding: '6px' }} onClick={() => registrarAsistenciaRapida(est, 'EXCUSADO')}>Tarde</Button>
              <Button style={{ backgroundColor: '#ef4444', padding: '6px' }} onClick={() => registrarAsistenciaRapida(est, 'AUSENTE')}>Ausente</Button>
            </div>
          )}
        </td>
      </>
    );
  };

  return (
    <div className="pagina-fondo">
      <Navbar />
      
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--text-dark)' }}>Gestión de Estudiantes y Asistencia</h2>
        
        {/* Formulario */}
        <div className="card" style={{ marginBottom: '20px' }}>
          <h3>Registrar Nuevo Estudiante</h3>
          <form onSubmit={handleCrear} style={{ display: 'flex', gap: '10px' }}>
            <Input placeholder="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
            <Input placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <div style={{ width: '150px' }}>
              <Button type="submit" loading={guardando}>+ Agregar</Button>
            </div>
          </form>
        </div>

        {/* Tabla y Calendario */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Tomar Asistencia</h3>
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <Button style={{ backgroundColor: '#2563eb', width: 'auto' }} onClick={exportarReporteCSV}>
              Descargar Reporte CSV
            </Button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <DataTable headers={headers} data={estudiantes} renderRow={renderRow} />
          )}
        </div>
      </div>
    </div>
  );
}