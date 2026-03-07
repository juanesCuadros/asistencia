import axios from 'axios';

// Definimos la URL base de tu backend para no repetirla
const API_URL = 'http://localhost:8080/api/clases'; 

// Función para obtener las clases
export const obtenerClases = async () => {
    try {
        // ✔️ Ahora Axios sabe que debe ir al puerto 8080
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo las clases:", error);
        throw error;
    }
};

// Función para crear una clase nueva
export const crearClase = async (datosClase) => {
    try {
        const response = await axios.post(API_URL, datosClase);
        return response.data;
    } catch (error) {
        console.error("Error creando la clase:", error);
        throw error;
    }
};