package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Role;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface IUsuarioDao extends JpaRepository<Usuario, Long> {

    //    public Usuario findByUsername(String username);
    @Query("from Carrera")
    public List<Carrera> findAllCarreras();

    @Query("from Instituto")
    public List<Instituto> findAllInstitutos();

    @Query("from Role")
    public List<Role> findAllRoles();

    @Query("select u from Usuario u where u.username = ?1")
    public Optional<Usuario> findByUsername(String username);

    @Query("select u from Usuario u where u.email = ?1")
    public Optional<Usuario> findByEmail (String email);

    @Query("from Usuario u where u.token = ?1")
    public Usuario findUsuarioByToken (String token);

    @Query("from Usuario u where u.ci = ?1")
    public Usuario findByCi (String ci);

    Optional<Usuario> findOneBySocialId(String socialId);
}
