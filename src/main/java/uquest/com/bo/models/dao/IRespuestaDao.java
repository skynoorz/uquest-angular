package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import uquest.com.bo.models.entity.Respuesta;

import java.util.List;

public interface IRespuestaDao extends CrudRepository<Respuesta, Long> {

  List<Respuesta> findAllByPreguntaId(Long preguntaId);

  @Query("select r from Respuesta r join Pregunta p on r.preguntaId = p.id and p.encuesta.id = :encuestaId")
  List<Respuesta> findAllByEncuesta(@Param("encuestaId") Long encuestaId);
}
