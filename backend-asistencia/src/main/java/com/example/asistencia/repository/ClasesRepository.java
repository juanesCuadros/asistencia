package com.example.asistencia.repository;

import com.example.asistencia.model.Clases;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasesRepository extends JpaRepository<Clases, Long> {
}