package uquest.com.bo.models.services.encuesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.IEncuestaDao;
import uquest.com.bo.models.entity.Encuesta;

import java.util.List;

@Service
public class IEncuestaServiceImpl implements IEncuestaService{

    @Autowired
    private IEncuestaDao encuestaDao;

    @Override
    public List<Encuesta> findAll() {
        return (List<Encuesta>) encuestaDao.findAll();
    }

    @Override
    public Encuesta save(Encuesta encuesta) {
        return encuestaDao.save(encuesta);
    }

    @Override
    public Encuesta findOne(Long id) {
        return encuestaDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        encuestaDao.deleteById(id);
    }

    @Override
    public List<Encuesta> findAllEncuestas() {
        return null;
    }

    @Override
    public List<Encuesta> findAllEncuestasByUsuarioId(Long id) {
        return encuestaDao.findAllEncuestasByUsuarioId();
    }

    @Override
    public List<Encuesta> findAllEncuestasByUsername(String user) {
        return encuestaDao.findAllEncuestasByUsername(user);
    }

    @Override
    public List<Encuesta> findAllPublic() {
        return encuestaDao.findAllPublic();
    }

    @Override
    public List<Long> available() {
        return encuestaDao.availables();
    }
}
