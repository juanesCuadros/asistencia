package com.example.asistencia.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "profesores")
public class Profesor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long idProfesor;

  private String nombre;
  private String cedula;
  private String nombreUsuario; // Corregido el error tipográfico de tu diagrama
  private String contrasena;

  // Relación: Un profesor puede tener muchas clases
  @OneToMany(mappedBy = "profesor")
  private List<Clase> clases;

  public Long getIdProfesor() {
    return idProfesor;
  }

  public void setIdProfesor(Long idProfesor) {
    this.idProfesor = idProfesor;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getCedula() {
    return cedula;
  }

  public void setCedula(String cedula) {
    this.cedula = cedula;
  }

  public String getNombreUsuario() {
    return nombreUsuario;
  }

  public void setNombreUsuario(String nombreUsuario) {
    this.nombreUsuario = nombreUsuario;
  }

  public String getContrasena() {
    return contrasena;
  }

  public void setContrasena(String contrasena) {
    this.contrasena = contrasena;
  }

  public List<Clase> getClases() {
    return clases;
  }

  public void setClases(List<Clase> clases) {
    this.clases = clases;
  }

}
