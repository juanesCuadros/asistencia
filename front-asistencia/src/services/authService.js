// src/services/authService.js

const API_URL = 'http://localhost:8080/api/profesores/login';

export const iniciarSesion = async (nombreUsuario, contrasena) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ATENCIÓN: Estos nombres deben coincidir EXACTAMENTE con el DTO del backend
      body: JSON.stringify({ 
        nombreUsuario: nombreUsuario, 
        contrasena: contrasena 
      }) 
    });

    const datos = await respuesta.json();

    // Si el backend responde HTTP 401 (Credenciales inválidas)
    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al iniciar sesión");
    }

    // Si todo sale bien, retorna { mensaje: "Login exitoso" }
    return datos; 

  } catch (error) {
    // Si el servidor de tu compañero está apagado
    if (error.message === "Failed to fetch") {
      throw new Error("No se pudo conectar al servidor. Verifica que el backend esté encendido.");
    }
    throw error;
  }
};