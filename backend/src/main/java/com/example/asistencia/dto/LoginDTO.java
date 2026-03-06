package com.example.asistencia.dto;

public class LoginDTO {
  private String nombreUsuario;
  private String contrasena;

  // Genera los Getters y Setters aquí...
  public String getNombreUsuario() { return nombreUsuario; }
  public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }
  public String getContrasena() { return contrasena; }
  public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}
