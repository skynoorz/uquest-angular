package uquest.com.bo.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "encuestas")
public class Encuesta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "El titulo no debe estar vacio.")
    private String titulo;

    @NotEmpty(message = "La descripcion no debe estar vacia.")
    private String descripcion;

    @NotEmpty(message = "El tipo no debe estar vacio.")
    private String tipo;

    @Temporal(TemporalType.DATE)
    private Date createAt;

    private String UID;

    @NotNull(message = "La fecha de inicio de la encuesta no debe estar vacia!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaIni;

    @NotNull(message = "La fecha final de la encuesta no debe estar vacia!")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaFin;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinTable(name = "encuestas_carreras",
            joinColumns = @JoinColumn(name = "encuesta_id"),
            inverseJoinColumns = @JoinColumn(name = "carrera_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"encuesta_id","carrera_id"})})
    private List<Carrera> carreras;

//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "encuesta_id")
//    private List<Usuario> usuarios = new ArrayList<Usuario>();

//    @ManyToOne (fetch = FetchType.LAZY)
//    @ManyToOne()
//    private Usuario usuario;


    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull(message = "La categoria no debe estar vacia")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
//    @ManyToOne
    private Categoria categoria;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "encuesta_id")
    @NotNull(message = "Las preguntas no deben estar vacias!")
    private List<Pregunta> preguntas;

    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
//    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario usuario;

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getFechaIni() {
        return fechaIni;
    }

    public void setFechaIni(Date fechaIni) {
        this.fechaIni = fechaIni;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Carrera> getCarreras() {
        return carreras;
    }

    public void setCarreras(List<Carrera> carreras) {
        this.carreras = carreras;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }
}
