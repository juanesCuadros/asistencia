// src/pages/Estudiantes.jsx
import { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { obtenerEstudiantesPorClase, crearEstudiante, matricularEstudianteEnClase } from '../services/estudiantesService';
import { guardarAsistenciaLista, /*obtenerAsistenciasPorClaseYFecha*/ } from '../services/asistenciasService';
import './Estudiantes.css';

export default function Estudiantes() {
  const { idClase } = useParams();

  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [codigo, setCodigo] = useState('');
  const [guardando, setGuardando] = useState(false);

  // PARA LA FECHA Y ASISTENCIA

  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [asistenciasMarcadas, setAsistenciasMarcadas] = useState({});

 

  const cargarLista = useCallback( async () => {
    try {
      setCargando(true);
      const datos = await obtenerEstudiantesPorClase(idClase);
      setEstudiantes(datos);
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  },[idClase]);

   useEffect(() => {
    cargarLista();
  }, [cargarLista]);

  
  // limpiar y tomar la asistencia de otro dia
  // Cargar asistencia cuando el profesor cambia la fecha en el calendario
  // limpiar y tomar la asistencia de otro dia
  useEffect(() => {
    setAsistenciasMarcadas({});
  }, [fecha]);// Se ejecuta cada vez que cambias la fecha o de clase

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombreEstudiante.trim() || !codigo.trim()) return;

    try {
      setGuardando(true);
      
      // 1. Creamos el estudiante en la base de datos general
      const nuevoEstudiante = await crearEstudiante({ codigo, nombreEstudiante });
      
      // Sacamos el ID del estudiante recién creado (dependiendo de cómo lo llame tu backend)
      const idDelNuevoEstudiante = nuevoEstudiante.idEstudiante || nuevoEstudiante.id;
      
      // 2. ¡LA MAGIA! Lo matriculamos en la clase actual usando el ID de la URL
      // Nota: Si tu variable del useParams se llama 'id', usa 'id'. Si se llama 'idClase', usa 'idClase'.
      await matricularEstudianteEnClase(idClase, idDelNuevoEstudiante); 

      // 3. Limpiamos los inputs
      setNombreEstudiante('');
      setCodigo('');
      
      // 4. Recargamos la tabla para que ahora SÍ aparezca el estudiante en esta clase
      await cargarLista();
      
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear o matricular el estudiante.");
    } finally {
      setGuardando(false);
    }
  };

  const registrarAsistenciaRapida = async (estudiante, estadoEnum) => {
    try {
      const idDelEstudiante = estudiante.idEstudiante || estudiante.id || estudiante.id_estudiante;
      const idDeLaClase = parseInt(idClase); // Mantenemos el ID 1 por ahora

      // Usamos la fecha que el profesor haya elegido en el calendario
      const datosAsistencia = [{
        fecha: fecha, 
        estado: estadoEnum, 
        estudiante: { idEstudiante: idDelEstudiante },
        clase: { idClase: idDeLaClase } 
      }];

      await guardarAsistenciaLista(datosAsistencia);
      
      setAsistenciasMarcadas((estadoAnterior) => ({
        ...estadoAnterior,
        [idDelEstudiante]: estadoEnum
      }));
      
    } catch (err) {
      console.error(err);
      alert(`Error al guardar asistencia. Revisa la consola.`);
    }
  };

  const exportarReporteCSV = () => {
    let contenidoCSV = "ID,Codigo,Nombre,Estado de Asistencia,Fecha\n";

    estudiantes.forEach(est => {
      const idEst = est.idEstudiante || est.id || est.id_estudiante;
      const estado = asistenciasMarcadas[idEst] || "Sin marcar"; 
      const nombre = est.nombreEstudiante || est.nombre_estudiante;
      
      // El reporte también usa la fecha seleccionada
      contenidoCSV += `${idEst},${est.codigo},${nombre},${estado},${fecha}\n`;
    });

    const blob = new Blob([contenidoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Reporte_Asistencia_${fecha}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="estudiantes-page">
      <Navbar />
      
      <div className="estudiantes-container">
        <h2 className="titulo-pagina">Gestión de Estudiantes y Asistencia</h2>
        
        {/* Formulario de creación */}
        <div className="tarjeta">
          <h3 style={{ marginTop: 0 }}>Registrar Nuevo Estudiante</h3>
          <form onSubmit={handleCrear} className="formulario-estudiante">
            <input 
              type="text" 
              className="input-form"
              placeholder="Código" 
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
            <input 
              type="text" 
              className="input-form"
              placeholder="Nombre completo" 
              value={nombreEstudiante}
              onChange={(e) => setNombreEstudiante(e.target.value)}
              required
            />
            <button type="submit" className="btn-primario" disabled={guardando}>
              {guardando ? 'Guardando...' : '+ Agregar'}
            </button>
          </form>
        </div>

        {/* Tabla con botones rápidos */}
        <div className="tarjeta">
          
          {/* CABECERA DE LA TABLA CON EL CALENDARIO Y EL BOTÓN DE DESCARGA */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ margin: 0 }}>Tomar Asistencia</h3>
              
              {/* --- AQUÍ ESTÁ EL NUEVO CALENDARIO --- */}
              <input 
                type="date" 
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#374151' }}
              />
            </div>

            <button 
              onClick={exportarReporteCSV} 
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
               Descargar Reporte
            </button>
          </div>

          {cargando && <p>Cargando datos...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!cargando && !error && (
            <table className="tabla-estudiantes">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre del Estudiante</th>
                  <th>Marcar Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center' }}>No hay estudiantes registrados.</td>
                  </tr>
                ) : (
                  estudiantes.map((est) => {
                    const idEst = est.idEstudiante || est.id || est.id_estudiante;
                    const estadoYaMarcado = asistenciasMarcadas[idEst];

                    return (
                      <tr key={idEst}>
                        <td style={{ fontWeight: 'bold' }}>{est.codigo}</td>
                        <td>{est.nombreEstudiante || est.nombre_estudiante}</td>
                        <td>
                          {estadoYaMarcado ? (
                            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                              ✅ Registrado ({estadoYaMarcado})
                            </span>
                          ) : (
                            <div className="acciones-asistencia">
                              <button 
                                className="btn-inline btn-tiempo" 
                                title="Presente"
                                onClick={() => registrarAsistenciaRapida(est, 'PRESENTE')}
                              >
                                "Presente"
                              </button>
                              <button 
                                className="btn-inline btn-tarde" 
                                title="Excusado (Tarde/Permiso)"
                                onClick={() => registrarAsistenciaRapida(est, 'EXCUSADO')}
                              >
                                "Tarde"
                              </button>
                              <button 
                                className="btn-inline btn-falta" 
                                title="Ausente"
                                onClick={() => registrarAsistenciaRapida(est, 'AUSENTE')}
                              >
                                "No asitio"
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}