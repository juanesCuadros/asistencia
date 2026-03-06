package com.example.asistencia.repository;

import com.example.asistencia.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

  // Spring Boot crea la consulta SQL automáticamente solo con leer el nombre del método:
  // "SELECT * FROM profesores WHERE nombre_usuario = ?"
  Optional<Profesor> findByNombreUsuario(String nombreUsuario);
}
