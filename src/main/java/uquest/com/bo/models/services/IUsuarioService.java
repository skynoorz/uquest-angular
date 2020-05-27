package uquest.com.bo.models.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;

public interface IUsuarioService {

    public List<Usuario> findAll();

    public Page<Usuario> findAll(Pageable pageable);

    public Usuario findById(Long id);

    public Usuario save(Usuario usuario);

    public void delete(Long id);
}
