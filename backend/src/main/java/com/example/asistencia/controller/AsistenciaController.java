package com.example.asistencia.controller;

import com.example.asistencia.model.Asistencia;
import com.example.asistencia.service.AsistenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
// @CrossOrigin(origins = "http://localhost:3003") // Permite solicitudes desde el puerto 3003 (Vite)
@CrossOrigin(origins = "*") // Permite solicitudes desde el puerto 3003 (Vite)

public class AsistenciaController {

  @Autowired
  private AsistenciaService asistenciaService;

  // Guardar una lista de asistencias (POST http://localhost:8080/api/asistencias)
  @PostMapping
  public List<Asistencia> guardarLista(@RequestBody List<Asistencia> asistencias) {
    return asistenciaService.guardarAsistencias(asistencias);
  }

  // Generar reporte por clase y fecha (GET http://localhost:8080/api/asistencias/reporte/clase/1?fecha=2023-10-25)
  @GetMapping("/reporte/clase/{idClase}")
  public List<Asistencia> reportePorClaseYFecha(
    @PathVariable Long idClase,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

    return asistenciaService.reportePorClaseYFecha(idClase, fecha);
  }
}
