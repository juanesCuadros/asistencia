import api from './api';

export const guardarAsistenciaLista = async (datosAsistencia) => {
  const response = await api.post('/asistencias', datosAsistencia);
  return response.data;
};