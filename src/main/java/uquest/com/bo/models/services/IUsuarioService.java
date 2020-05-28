package uquest.com.bo.models.services;

import org.springframework.data.jpa.repository.Query;
import uquest.com.bo.models.entity.Usuario;

public interface IUsuarioService {

    @Query("select u from Usuario u where u.username = ?1")
    public Usuario findByUsername(String username);
}
