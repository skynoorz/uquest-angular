package uquest.com.bo.models.services.encuesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.IEncuestaDao;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IRespuestaDao;
import uquest.com.bo.models.entity.Encuesta;

import java.util.List;

@Service
public class IEncuestaServiceImpl implements IEncuestaService{

    @Autowired
    private IRespuestaDao respuestaDao;

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

    @Transactional
    @Override
    public void delete(Long id) {
        respuestaDao.deleteByEncuestaId(id);
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

    @Transactional
    @Override
    public void finalizar(Long id) {
        encuestaDao.finalizar(id);
    }

    @Override
    public List<Encuesta> getEncuestasByCarrera(Long id) {
        return this.encuestaDao.getAllEncuestasByCarreraId(id);
    }

    @Override
    public List<Encuesta> getEncuestasByCarreraList(Long id) {
        return this.encuestaDao.getAllEncuestasByCarreraList(id);
    }

    @Override
    public Encuesta findByUID(String uid) {
        return this.encuestaDao.findByUID(uid);
    }

}
