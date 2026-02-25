package com.example.asistencia.service;

import com.example.asistencia.model.Profesor;
import com.example.asistencia.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfesorService {

  @Autowired
  private ProfesorRepository profesorRepository;

  public boolean login(String nombreUsuario, String contrasena) {
    Optional<Profesor> profesorOpt = profesorRepository.findByNombreUsuario(nombreUsuario);

    // Si el profesor existe y la contraseña coincide, retorna true (Login exitoso)
    if (profesorOpt.isPresent()) {
      Profesor profesor = profesorOpt.get();
      return profesor.getContrasena().equals(contrasena);
    }
    return false; // Login fallido
  }
}
