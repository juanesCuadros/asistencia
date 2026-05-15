import api from './api';

export const obtenerEstudiantesPorClase = async (idClase) => {
  const response = await api.get(`/clases/${idClase}`);
  return response.data.estudiantes || []; 
};

export const crearEstudiante = async (datosEstudiante) => {
  const response = await api.post('/estudiantes', datosEstudiante);
  return response.data;
};

export const matricularEstudianteEnClase = async (idClase, idEstudiante) => {
  const response = await api.post(`/clases/${idClase}/estudiantes/${idEstudiante}`);
  return response.data;
};