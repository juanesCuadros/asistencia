// src/App.jsx (o App.js)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Estudiantes from './pages/Estudiantes';
import Cursos from './pages/Cursos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta por defecto: El Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rutas del sistema */}

        <Route path="/cursos" element={<Cursos />} />

        <Route path="/estudiantes/:idClase" element={<Estudiantes />} />

        

        {/* Si el usuario escribe una URL que no existe, lo mandamos al Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}