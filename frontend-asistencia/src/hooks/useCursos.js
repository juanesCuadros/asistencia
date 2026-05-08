// src/hooks/useCursos.js
import { useState, useEffect, useCallback } from 'react';
import { obtenerClases, crearClase } from '../services/cursosService';

export function useCursos() {
  const [cursos, setCursos]   = useState([]);
  const [nombre, setNombre]   = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarCursos = useCallback(async () => {
    try {
      const data = await obtenerClases();
      setCursos(data);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    }
  }, []);

  useEffect(() => { cargarCursos(); }, [cargarCursos]);

  const handleCrearCurso = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMensaje('Por favor ingresa el nombre de la clase');
      return;
    }
    try {
      const claseGuardada = await crearClase({
        nombre,
        profesor: { idProfesor: 1 }
      });
      setNombre('');
      setCursos(prev => [...prev, claseGuardada]);
      setMensaje('¡Clase creada con éxito!');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      setMensaje('Hubo un error al crear la clase');
      console.error(error);
    }
  };

  return { cursos, nombre, setNombre, mensaje, handleCrearCurso };
}