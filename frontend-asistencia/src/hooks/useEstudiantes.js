// src/hooks/useEstudiantes.js
import { useState, useEffect, useCallback } from 'react';
import { obtenerEstudiantesPorClase, crearEstudiante, matricularEstudianteEnClase } from '../services/estudiantesService';
import { guardarAsistenciaLista } from '../services/asistenciasService';

export function useEstudiantes(idClase) {

  // --- Estado de la lista ---
  const [estudiantes, setEstudiantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // --- Estado del formulario ---
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [codigo, setCodigo] = useState('');
  const [guardando, setGuardando] = useState(false);

  // --- Estado de asistencia ---
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [asistenciasMarcadas, setAsistenciasMarcadas] = useState({});

  // Carga la lista de estudiantes
  const cargarLista = useCallback(async () => {
    try {
      setCargando(true);
      const datos = await obtenerEstudiantesPorClase(idClase);
      setEstudiantes(datos);
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  }, [idClase]);

  // Carga inicial
  useEffect(() => {
    cargarLista();
  }, [cargarLista]);

  // Limpia asistencias al cambiar de fecha
  useEffect(() => {
    setAsistenciasMarcadas({});
  }, [fecha]);

  // Crea y matricula un estudiante nuevo
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombreEstudiante.trim() || !codigo.trim()) return;

    try {
      setGuardando(true);
      const nuevoEstudiante = await crearEstudiante({ codigo, nombreEstudiante });
      const idDelNuevoEstudiante = nuevoEstudiante.idEstudiante || nuevoEstudiante.id;
      await matricularEstudianteEnClase(idClase, idDelNuevoEstudiante);
      setNombreEstudiante('');
      setCodigo('');
      await cargarLista();
    } catch (err) {
      console.error(err);
      alert("Hubo un error al crear o matricular el estudiante.");
    } finally {
      setGuardando(false);
    }
  };

  // Registra la asistencia de un estudiante
  const registrarAsistenciaRapida = async (estudiante, estadoEnum) => {
    const idDelEstudiante = estudiante.idEstudiante || estudiante.id || estudiante.id_estudiante;
    const idDeLaClase = parseInt(idClase);

    try {
      await guardarAsistenciaLista([{
        fecha,
        estado: estadoEnum,
        estudiante: { idEstudiante: idDelEstudiante },
        clase: { idClase: idDeLaClase }
      }]);

      setAsistenciasMarcadas((prev) => ({
        ...prev,
        [idDelEstudiante]: estadoEnum
      }));
    } catch (err) {
      console.error(err);
      alert("Error al guardar asistencia. Revisa la consola.");
    }
  };

  // Genera y descarga el CSV
  const exportarReporteCSV = () => {
    let contenidoCSV = "ID,Codigo,Nombre,Estado de Asistencia,Fecha\n";

    estudiantes.forEach((est) => {
      const idEst = est.idEstudiante || est.id || est.id_estudiante;
      const nombre = est.nombreEstudiante || est.nombre_estudiante;
      const estado = asistenciasMarcadas[idEst] || "Sin marcar";
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

  // Todo lo que el componente necesita
  return {
    // Lista
    estudiantes,
    cargando,
    error,
    // Formulario
    nombreEstudiante,
    setNombreEstudiante,
    codigo,
    setCodigo,
    guardando,
    handleCrear,
    // Asistencia
    fecha,
    setFecha,
    asistenciasMarcadas,
    registrarAsistenciaRapida,
    exportarReporteCSV,
  };
}