package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Encuesta;

import java.util.List;

public interface IEncuestaDao extends CrudRepository<Encuesta, Long> {

    @Query("from Encuesta")
    public List<Encuesta> findAllEncuestasByUsuarioId();
}
