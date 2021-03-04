package uquest.com.bo.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "carreras")
public class Carrera implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotEmpty
    private String nombre;

    @Column
    @NotEmpty
    private String direccion;

    @Column
    @NotEmpty
    private String fono;

    @Column
    @NotEmpty
    private String email;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "carrera", orphanRemoval = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Instituto> institutos;

//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,  mappedBy = "carrera")
////    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Instituto> institutos;

//    @JsonIgnore
//    @ManyToMany(mappedBy = "carreras")
//    private List<Persona> usuarios;

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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
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

    public List<Instituto> getInstitutos() {
        return institutos;
    }

    public void setInstitutos(List<Instituto> institutos) {
        this.institutos = institutos;
    }
}
