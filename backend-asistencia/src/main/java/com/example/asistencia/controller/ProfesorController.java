package com.example.asistencia.controller;

import com.example.asistencia.dto.LoginDTO;
import com.example.asistencia.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfesorController {

  @Autowired
  private ProfesorService profesorService;

  // POST http://localhost:8080/api/profesores/login
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestBody LoginDTO loginDTO) {
    boolean esValido = profesorService.login(loginDTO.getNombreUsuario(), loginDTO.getContrasena());

    Map<String, String> respuesta = new HashMap<>();

    if (esValido) {
      respuesta.put("mensaje", "Login exitoso");
      return ResponseEntity.ok(respuesta); // Retorna HTTP 200
    } else {
      respuesta.put("mensaje", "Credenciales inválidas");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(respuesta); // Retorna HTTP 401
    }
  }
}
