package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.UPR;

import java.util.List;

public interface IUPRDao extends CrudRepository<UPR, Long> {

    @Query("select upr from UPR upr, Encuesta e, Pregunta p where p.encuesta.id =  e.id and upr.pregunta = p and e.id = ?1")
//    @Query("from UPR")
    public List<UPR> findByEncuestaId(Long id);

}
