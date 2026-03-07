// src/services/asistenciaService.js

const API_URL = 'http://localhost:8080/api/asistencias';

export const guardarAsistenciaLista = async (listaAsistencias) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convertimos el arreglo de asistencias a JSON
      body: JSON.stringify(listaAsistencias) 
    });
    
    if (!respuesta.ok) throw new Error("Error al guardar la asistencia");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// src/services/asistenciasService.js
/*
export const obtenerAsistenciasPorClaseYFecha = async (idClase, fecha) => {
  try {
    const respuesta = await fetch(`http://localhost:8080/api/asistencias/clase/${idClase}/fecha/${fecha}`);
    
    // Si no hay asistencias ese día (ej. da error 404 o similar), devolvemos un arreglo vacío
    if (!respuesta.ok) return []; 
    
    return await respuesta.json();
  } catch (error) {
    console.error("Error obteniendo asistencias:", error);
    return [];
  }
};*/