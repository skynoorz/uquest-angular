package uquest.com.bo.models.services.respuesta;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IRespuestaDao;
import uquest.com.bo.models.entity.Respuesta;

import java.util.List;

@Service
@Transactional
public class RespuestaService {

  private final IRespuestaDao respuestaDao;

  public RespuestaService(IRespuestaDao respuestaDao) {
    this.respuestaDao = respuestaDao;
  }

  public void saveRespuestas(List<Respuesta> respuestas) {
    respuestaDao.saveAll(respuestas);
  }

  public List<Respuesta> getAllRespuestasByPregunta(Long preguntaId) {
    return respuestaDao.findAllByPreguntaId(preguntaId);
  }

  public List<Respuesta> getAllRespuestasByEncuesta(Long encuestaId) {
    return respuestaDao.findAllByEncuesta(encuestaId);
  }

  public List<Long> findAllUsersAnsweredByEncuesta(Long encuestaId){
    return respuestaDao.findAllUsersAnsweredByEncuesta(encuestaId);
  }

  public List<String> findTextValueByPregunta(Long encuestaId){
    return respuestaDao.getRespuestasTextValueByPregunta(encuestaId);
  }

  public List<Long> findAllUsersAnsweredByEncuestaUID(String encuestaUID) {
    return respuestaDao.findAllUsersAnsweredByEncuestaUID(encuestaUID);
  }
}
