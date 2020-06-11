package uquest.com.bo.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "preguntas")
public class Pregunta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String descripcion;

    @Temporal(TemporalType.DATE)
    private Date createAt;

    @NotEmpty
    private String tipo;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name="encuesta_id")
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    @NotNull(message = "la encuesta no puede estar vacia")
//    private Encuesta encuesta;

    //sin este json ignore hay error para agregar a la bd
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "preguntas_opciones",
//            joinColumns = @JoinColumn(name = "opcion_id"),
//            inverseJoinColumns = @JoinColumn(name = "pregunta_id"))
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "preguntas_opciones",
            joinColumns = @JoinColumn(name = "pregunta_id"),
            inverseJoinColumns = @JoinColumn(name = "opcion_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"pregunta_id","opcion_id"})})
    private List<Opcion> opciones = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<Opcion> getOpciones() {
        return opciones;
    }

    public void setOpciones(List<Opcion> opciones) {
        this.opciones = opciones;
    }
}
