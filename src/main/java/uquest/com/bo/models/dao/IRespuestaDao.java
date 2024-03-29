package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import uquest.com.bo.models.entity.Respuesta;
import uquest.com.bo.models.projection.RespuestasReport;
import uquest.com.bo.models.projection.RespuestasStats;

import java.util.List;

public interface IRespuestaDao extends CrudRepository<Respuesta, Long> {

    List<Respuesta> findAllByPreguntaId(Long preguntaId);

    @Query("select r from Respuesta r join Pregunta p on r.preguntaId = p.id and p.encuesta.id = :encuestaId")
    List<Respuesta> findAllByEncuesta(@Param("encuestaId") Long encuestaId);

    @Query("select DISTINCT r.usuarioId from Respuesta r join Pregunta p on r.preguntaId = p.id and p.encuesta.id = :encuestaId")
    List<Long> findAllUsersAnsweredByEncuesta(@Param("encuestaId") Long encuestaId);

    @Query(value = "select\n" +
            "p.id as pregunta_id,\n" +
            "p.encuesta_id , p.descripcion,\n" +
            "o.id as opcion_id,\n" +
//          "case when o.texto is null then rse.resp else o.texto end as resp_text,\n" +
            "case when o.texto is null then CAST(rse.resp as VARCHAR) else o.texto end as resp_text,\n" +
            "case when rso.resp_count is null then rse.resp_count else rso.resp_count end as resp_count\n" +
            "from preguntas p\n" +
            "join preguntas_opciones po on p.id = po.pregunta_id\n" +
            "join opciones o on o.id = po.opcion_id\n" +
            "left join respuestas_stats_op rso on rso.pregunta_id = p.id and o.id = rso.resp\n" +
            "left join respuestas_stats_esc rse on rse.pregunta_id = p.id\n" +
            "where p.encuesta_id = ?1\n" +
            "order by p.id, o.id;", nativeQuery = true)
    public List<RespuestasStats> getRespuestasOp(Long idEncuesta);


    @Query(value = "select count(DISTINCT r.usuario_id) \n" +
            "from respuestas r,(select id as id_pregunta from preguntas where encuesta_id = ?1) as preguntas_id \n" +
            "where r.pregunta_id = preguntas_id.id_pregunta;", nativeQuery = true)
    public Long getRespuestasTotalByEncuestaId(Long idEncuesta);

    @Query("select r.textValue from Respuesta r where r.preguntaId = ?1")
    public List<String> getRespuestasTextValueByPregunta(Long idEncuesta);

    @Query(value = "select DISTINCT r.usuario_id from respuestas r join preguntas p on r.pregunta_id = p.id, (select id as id from encuestas where UID = ?1) uidconector where uidconector.id = p.encuesta_id;", nativeQuery = true)
    public List<Long> findAllUsersAnsweredByEncuestaUID(@Param("encuestaUID") String encuestaUID);

    @Query(value = "SELECT p.tipo, p.descripcion, num_value, o.texto,  text_value, u.apellido_pat, u.apellido_mat, u.nombres\n" +
            "FROM respuestas r\n" +
            "LEFT JOIN opciones o\n" +
            "ON r.opcion_id = o.id\n" +
            "LEFT JOIN preguntas p\n" +
            "ON r.pregunta_id = p.id\n" +
            "LEFT JOIN usuarios u\n" +
            "on r.usuario_id = u.id where p.encuesta_id = ?1", nativeQuery = true)
    List<RespuestasReport> findRespuestasReport(Long encuestaId);

    @Modifying
    @Query(value = "DELETE FROM respuestas WHERE id IN (select rid from (select r.id as rid\n" +
            "from respuestas r\n" +
            "left join preguntas p\n" +
            "on r.pregunta_id = p.id\n" +
            "left join encuestas e\n" +
            "on p.encuesta_id = e.id where e.id = ?1) as c)", nativeQuery = true)
    public void deleteByEncuestaId(@Param("encuestaId") Long id);
}
