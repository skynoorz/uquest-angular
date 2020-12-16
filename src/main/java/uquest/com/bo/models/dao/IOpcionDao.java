package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Opcion;

import java.util.List;

public interface IOpcionDao extends CrudRepository<Opcion, Long> {

    @Query("select o.id from Opcion o where o.texto = ?1")
    public List<Long> getIdByTexto(String texto);
}
