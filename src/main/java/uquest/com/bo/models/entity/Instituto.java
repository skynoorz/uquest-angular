package uquest.com.bo.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "institutos")
public class Instituto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotEmpty
    private String nombre;

    @Column
    @NotEmpty
    private String sigla;

    @Column
    @NotEmpty
    private String fono;

    @Column
    @NotEmpty
    private String email;

    @ManyToOne
    @JoinColumn(name="carrera_id")
    private Carrera carrera;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonIgnore
//    @JoinColumn(name="carrera_id")
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private Carrera carrera;

//    @JsonIgnore
//    @ManyToMany(mappedBy = "institutos")
//    private List<Persona> usuarios;

    @JsonIgnore
    public Carrera getCarrera() {
        return carrera;
    }

    @JsonProperty
    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getFono() {
        return fono;
    }

    public void setFono(String fono) {
        this.fono = fono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
