package com.example.asistencia.controller;

import com.example.asistencia.model.Clases;
import com.example.asistencia.service.ClasesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clases")
@CrossOrigin(origins = {"http://localhost:3003", "https://ele5-3.apolobyte.top", "http://localhost:3008"})
public class ClasesController {

    @Autowired
    private ClasesService clasesService;

    @GetMapping
    public List<Clases> listarClases() {
        return clasesService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Clases obtenerClase(@PathVariable Long id) {
        return clasesService.obtenerPorId(id);
    }

    @PostMapping
    public Clases crearClase(@RequestBody Clases clase) {
        return clasesService.guardarClase(clase);
    }

    @PostMapping("/{idClase}/estudiantes/{idEstudiante}")
    public Clases matricular(@PathVariable Long idClase, @PathVariable Long idEstudiante) {
        return clasesService.matricularEstudiante(idClase, idEstudiante);
    }
}