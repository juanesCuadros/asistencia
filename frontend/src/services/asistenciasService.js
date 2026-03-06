// src/services/asistenciaService.js

const API_URL = 'http://localhost:3503/api/asistencias';

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