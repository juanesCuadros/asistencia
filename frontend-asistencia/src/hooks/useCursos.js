import { useState, useEffect } from 'react';
import { obtenerClases, crearClase } from '../services/cursosService';

export default function useCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarCursos = async () => {
    setLoading(true);
    try {
      const data = await obtenerClases();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar cursos", error);
    } finally {
      setLoading(false);
    }
  };

  const agregarCurso = async (nombre) => {
    try {
      const nuevoCurso = { 
        nombre: nombre,
        profesor: { idProfesor: 1 } // ID hardcodeado según tu lógica original
      };
      const claseGuardada = await crearClase(nuevoCurso);
      setCursos(prev => [...prev, claseGuardada]);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  return { cursos, loading, agregarCurso, refrescar: cargarCursos };
}