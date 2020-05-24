package uquest.com.bo.models.dao;

import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long> {
}
