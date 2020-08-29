package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.controllers.UPRRestController;
import uquest.com.bo.models.entity.UPR;
import uquest.com.bo.models.projection.UPRgroup;

import java.util.List;

public interface IUPRDao extends CrudRepository<UPR, Long> {

    @Query("select upr from UPR upr, Encuesta e, Pregunta p where p.encuesta.id =  e.id and upr.pregunta = p and e.id = ?1")
    public List<UPR> findByEncuestaId(Long id);

//    @Query("select upr.opcion.id , upr.pregunta.id, e.id, (count(upr.opcion.id)) as total from UPR upr, Encuesta e, Pregunta p where p.encuesta.id =  e.id and upr.pregunta = p and e.id = ?1 GROUP BY upr.opcion.id")
    @Query("select upr.opcion.id as opcionId , upr.pregunta.id as preguntaId, count(upr.opcion.id) as total from UPR upr, Encuesta e, Pregunta p " +
        " where p.encuesta.id =  e.id and upr.pregunta.id = p.id and e.id = ?1 GROUP BY upr.opcion.id, upr.pregunta.id")
    public List<UPRgroup> findTotalRespuestasByEncuestaId(Long id);
}
