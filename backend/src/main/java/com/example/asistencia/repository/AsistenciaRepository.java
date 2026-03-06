package com.example.asistencia.repository;

import com.example.asistencia.model.Asistencia;
import com.example.asistencia.model.Clase;
import com.example.asistencia.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

  // Para ver la lista de asistencia de un día específico en una clase específica
  List<Asistencia> findByClaseAndFecha(Clase clase, LocalDate fecha);

  // Para ver todo el historial de un estudiante específico
  List<Asistencia> findByEstudiante(Estudiante estudiante);
}
