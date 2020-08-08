package uquest.com.bo.models.services.encuesta;

import uquest.com.bo.models.entity.Encuesta;

import java.util.List;

public interface IEncuestaService {
    public List<Encuesta> findAll();

    public void save(Encuesta encuesta);

    public Encuesta findOne(Long id);

    public void delete(Long id);

    public List<Encuesta> findAllEncuestas();

    public List<Encuesta> findAllEncuestasByUsuarioId(Long id);

}
