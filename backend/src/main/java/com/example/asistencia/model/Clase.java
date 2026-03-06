package com.example.asistencia.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "clases")
public class Clase {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idClase;

  private String nombreClase;

  // Relación: Muchas clases pertenecen a un Profesor
  @ManyToOne
  @JoinColumn(name = "id_profesor")
  private Profesor profesor;

  // Relación: Muchos a Muchos con Estudiantes (Esto crea la matrícula)
  @ManyToMany
  @JoinTable(
    name = "clase_estudiante", // Spring creará esta tabla intermedia automáticamente
    joinColumns = @JoinColumn(name = "id_clase"),
    inverseJoinColumns = @JoinColumn(name = "id_estudiante")
  )
  private List<Estudiante> estudiantes;

  public Long getIdClase() {
    return idClase;
  }

  public void setIdClase(Long idClase) {
    this.idClase = idClase;
  }

  public String getNombreClase() {
    return nombreClase;
  }

  public void setNombreClase(String nombreClase) {
    this.nombreClase = nombreClase;
  }

  public Profesor getProfesor() {
    return profesor;
  }

  public void setProfesor(Profesor profesor) {
    this.profesor = profesor;
  }

  public List<Estudiante> getEstudiantes() {
    return estudiantes;
  }

  public void setEstudiantes(List<Estudiante> estudiantes) {
    this.estudiantes = estudiantes;
  }
}
