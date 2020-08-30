package uquest.com.bo.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    private static final long serialVersionUID = 1L;

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

    // IMAGEN

    private String foto;

    // RELACIONES
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="instituto_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Instituto instituto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="carrera_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @NotNull(message = "la carrera no puede estar vacia")
    private Carrera carrera;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "usuarios_roles",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"usuario_id","role_id"})})
    private List<Role> roles;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
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

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
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

    public boolean getEnabled(){
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
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

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Instituto getInstituto() {
        return instituto;
    }

    public void setInstituto(Instituto instituto) {
        this.instituto = instituto;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public List<Encuesta> getEncuestas() {
        return encuestas;
    }

    public void setEncuestas(List<Encuesta> encuestas) {
        this.encuestas = encuestas;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }
}
