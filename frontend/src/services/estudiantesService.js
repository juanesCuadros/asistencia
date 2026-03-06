// src/services/estudianteService.js

const API_URL = 'http://localhost:3503/api/estudiantes';

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