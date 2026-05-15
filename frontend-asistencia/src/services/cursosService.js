import api from './api';

export const obtenerClases = async () => {
  const response = await api.get('/clases');
  return response.data;
};

export const crearClase = async (datosClase) => {
  const response = await api.post('/clases', datosClase);
  return response.data;
};