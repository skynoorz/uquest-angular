package uquest.com.bo.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "no puede estar vacio")
    @Size(min = 4, max = 22, message = "debe tener entre 4 a 22 letras")
    @Column(nullable = false)
    private String nombres;

    @NotEmpty(message = "no puede estar vacio")
    @Column(nullable = false)
    private String apellidoPat;

    @NotEmpty(message = "no puede estar vacio")
    @Column(nullable = false)
    private String apellidoMat;

    @NotEmpty(message = "no puede estar vacio")
    @Size(max = 8, message = "tiene un maximo de 8 caracteres")
    @Column(nullable = false, unique = true)
    private String ci;

    @NotEmpty(message = "no puede estar vacio")
    @Column(nullable = false)
    private String sexo;

    @Temporal(TemporalType.DATE)
    private Date createAt;

    @NotEmpty(message = "no puede estar vacio")
    @Size(max = 30, message = "tiene un maximo de 30 caracteres")
    @Column(length = 30, unique = true, nullable = false)
    private String username;

    @NotEmpty(message = "no puede estar vacio")
    @Size(max = 60, message = "tiene un maximo de 60 caracteres")
    @Column(length = 60, nullable = false)
    private String password;

    private boolean enabled;

    @NotNull(message = "no puede estar vacio")
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fnac;

    @Email(message = "el correo debe tener formato valido")
    @NotEmpty(message = "no puede estar vacio")
    @Column(unique = true, nullable = false)
    private String email;

    // RELACIONES

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    @JoinTable(name = "usuarios_institutos", joinColumns = @JoinColumn(name = "instituto_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Instituto> institutos;

    @ManyToMany
//    @NotEmpty
    @JsonIgnore
    @JoinTable(name = "usuarios_carreras", joinColumns = @JoinColumn(name = "carrera_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Carrera> carreras;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.ALL, CascadeType.REMOVE}, fetch = FetchType.LAZY)
//    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "usuario_id")
    private List<Encuesta> encuestas;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPat() {
        return apellidoPat;
    }

    public void setApellidoPat(String apellidoPat) {
        this.apellidoPat = apellidoPat;
    }

    public String getApellidoMat() {
        return apellidoMat;
    }

    public void setApellidoMat(String apellidoMat) {
        this.apellidoMat = apellidoMat;
    }

    public String getCi() {
        return ci;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Date getFnac() {
        return fnac;
    }

    public void setFnac(Date fnac) {
        this.fnac = fnac;
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

    public List<Carrera> getCarreras() {
        return carreras;
    }

    public void setCarreras(List<Carrera> carreras) {
        this.carreras = carreras;
    }

    public List<Encuesta> getEncuestas() {
        return encuestas;
    }

    public void setEncuestas(List<Encuesta> encuestas) {
        this.encuestas = encuestas;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void mostrar() {
        System.out.println("ID Usuario: " + this.id);
        for (int i = 0; i < this.carreras.size(); i++) {
            System.out.println("Carrera nombre: " + this.carreras.get(i).getNombre());
            for (int j = 0; j < this.carreras.get(i).getInstitutos().size(); j++) {
                System.out.println("Insituto nombre: " + this.carreras.get(i).getInstitutos().get(j).getNombre());
            }
        }
    }

    public boolean existeI() {
        if (this.institutos.size() > 0)
            return true;
        return false;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }
}
