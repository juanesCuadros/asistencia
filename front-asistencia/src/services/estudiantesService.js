// src/services/estudianteService.js

const API_URL = 'http://localhost:8080/api/estudiantes';

// 1. Traer la lista de estudiantes
export const obtenerEstudiantes = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error("Error al cargar los estudiantes");
    return await respuesta.json(); 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 2. Guardar un nuevo estudiante
export const crearEstudiante = async (datosEstudiante) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosEstudiante)
    });
    if (!respuesta.ok) throw new Error("Error al crear el estudiante");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const CLASES_API_URL = 'http://localhost:8080/api/clases';
// 3. Traer SOLO los estudiantes de una clase específica
export const obtenerEstudiantesPorClase = async (idClase) => {
  try {
    const respuesta = await fetch(`${CLASES_API_URL}/${idClase}`);
    if (!respuesta.ok) throw new Error("Error al cargar la clase");
    
    // El backend nos devuelve todo el objeto Clase. 
    const clase = await respuesta.json();
    
    // Nosotros solo queremos devolver su lista de estudiantes (si no tiene, devolvemos un arreglo vacío)
    return clase.estudiantes || []; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const matricularEstudianteEnClase = async (idClase, idEstudiante) => {
  try {
    const respuesta = await fetch(`http://localhost:8080/api/clases/${idClase}/estudiantes/${idEstudiante}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!respuesta.ok) throw new Error("Error al matricular al estudiante");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};