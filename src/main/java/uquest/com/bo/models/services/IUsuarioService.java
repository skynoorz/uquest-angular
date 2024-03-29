package uquest.com.bo.models.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Role;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;

public interface IUsuarioService {

    public List<Usuario> findAll();

    public Page<Usuario> findAll(Pageable pageable);

    public Usuario findById(Long id);

    public Usuario save(Usuario usuario);

    public void delete(Long id);

    public List<Carrera> findAllCarreras();

    public List<Instituto> findAllInstitutos();

    public List<Role> findAllRoles();

    Usuario findByUsername(String name);

    Usuario findByEmail(String email);

    Usuario findUserByToken(String token);

    Usuario findByCi (String ci);
}
