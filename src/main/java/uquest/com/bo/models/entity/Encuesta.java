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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String titulo;

    @NotEmpty
    private String tipo;

    @Temporal(TemporalType.DATE)
    private Date createAt;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaIni;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fechaFin;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "encuesta_id")
    private List<Pregunta> preguntas = new ArrayList<Pregunta>();

//    @ManyToOne (fetch = FetchType.LAZY)
    @ManyToOne
    private Persona persona;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "dispositivos_encuestas",
            joinColumns = @JoinColumn(name = "encuesta_id"),
            inverseJoinColumns = @JoinColumn(name = "dispositivo_id"))
    private List<Dispositivo> dispositivos;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
//    @ManyToOne
    private Categoria categoria;

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public List<Dispositivo> getDispositivos() {
        return dispositivos;
    }

    public void setDispositivos(List<Dispositivo> dispositivos) {
        this.dispositivos = dispositivos;
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

    public String mostrar(){
        System.out.println("id:" + this.getId());
        System.out.println("titulo:" + this.getTitulo());
        System.out.println("tipo:" + this.getTipo());
        System.out.println("createAt:" + this.getCreateAt());
        System.out.println("fechaIni:" + this.getFechaIni());
        System.out.println("fechaFin:" + this.getFechaFin());
        try {
            System.out.println("categoria id: "+this.getCategoria().getId());
            System.out.println("categoria nombre: "+this.getCategoria().getNombre());
        }catch (Exception e){
            System.out.println("error con categoria");
        };
        try {
            for (int i = 0; i < this.getPreguntas().size(); i++) {
                System.out.println("pregunta "+i+ " id:"+this.getPreguntas().get(i).getId());
                System.out.println("pregunta "+i+ " descrip:"+this.getPreguntas().get(i).getDescripcion());
            }
        }catch (Exception e){
            System.out.println("error con preguntas");
        };
        return "";
    }
}
