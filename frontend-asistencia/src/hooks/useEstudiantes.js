import { useState, useEffect, useCallback } from 'react';
import { obtenerEstudiantesPorClase, crearEstudiante, matricularEstudianteEnClase } from '../services/estudiantesService';
import { guardarAsistenciaLista } from '../services/asistenciasService';

export default function useEstudiantes(idClase) {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [asistenciasMarcadas, setAsistenciasMarcadas] = useState({});

  const cargarLista = useCallback(async () => {
    try {
      setLoading(true);
      const datos = await obtenerEstudiantesPorClase(idClase);
      setEstudiantes(datos);
    } catch (err) {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, [idClase]);

  useEffect(() => {
    if (idClase) cargarLista();
  }, [cargarLista, idClase]);

  // Limpiar asistencias al cambiar de fecha
  useEffect(() => {
    setAsistenciasMarcadas({});
  }, [fecha]);

  const agregarYMatricularEstudiante = async (codigo, nombreEstudiante) => {
    try {
      const nuevoEstudiante = await crearEstudiante({ codigo, nombreEstudiante });
      const idDelNuevoEstudiante = nuevoEstudiante.idEstudiante || nuevoEstudiante.id;
      await matricularEstudianteEnClase(idClase, idDelNuevoEstudiante);
      await cargarLista();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const registrarAsistenciaRapida = async (estudiante, estadoEnum) => {
    try {
      const idDelEstudiante = estudiante.idEstudiante || estudiante.id || estudiante.id_estudiante;
      const datosAsistencia = [{
        fecha: fecha,
        estado: estadoEnum,
        estudiante: { idEstudiante: idDelEstudiante },
        clase: { idClase: parseInt(idClase) }
      }];
      
      await guardarAsistenciaLista(datosAsistencia);
      
      setAsistenciasMarcadas((prev) => ({
        ...prev,
        [idDelEstudiante]: estadoEnum
      }));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error al guardar asistencia" };
    }
  };

  const exportarReporteCSV = () => {
    let contenidoCSV = "ID,Codigo,Nombre,Estado de Asistencia,Fecha\n";
    estudiantes.forEach(est => {
      const idEst = est.idEstudiante || est.id || est.id_estudiante;
      const estado = asistenciasMarcadas[idEst] || "Sin marcar"; 
      const nombre = est.nombreEstudiante || est.nombre_estudiante;
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

  return {
    estudiantes, loading, error, fecha, setFecha, asistenciasMarcadas,
    agregarYMatricularEstudiante, registrarAsistenciaRapida, exportarReporteCSV
  };
}