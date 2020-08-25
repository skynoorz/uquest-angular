package uquest.com.bo.models.dao;

import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Categoria;

public interface ICategoriaDao extends CrudRepository<Categoria, Long> {

}
