package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import uquest.com.bo.models.entity.Usuario;

public interface IUsuarioDao extends JpaRepository<Usuario, Long> {
}
