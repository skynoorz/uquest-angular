package uquest.com.bo.models.services.encuesta;

import uquest.com.bo.models.entity.Encuesta;

import java.util.Date;
import java.util.List;

public interface IEncuestaService {
    public List<Encuesta> findAll();

    public Encuesta save(Encuesta encuesta);

    public Encuesta findOne(Long id);

    public void delete(Long id);

    public List<Encuesta> findAllEncuestas();

    public List<Encuesta> findAllEncuestasByUsuarioId(Long id);

    public List<Encuesta> findAllEncuestasByUsername(String user);

    public List<Encuesta> findAllPublic();

    public List<Long> available();

    public void finalizar(Long id);

    public List<Encuesta> getEncuestasByCarrera(Long id);

    public List<Encuesta> getEncuestasByCarreraList(Long id);

    public Encuesta findByUID(String uid);

    public void updateDate(Date fechaIni, Date fechaFin, Long encuestaId);
}
