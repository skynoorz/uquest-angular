package uquest.com.bo.models.services.carrera;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.ICarreraDao;
import uquest.com.bo.models.dao.IInstitutoDao;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;

import java.util.List;

@Service
public class ICarreraServiceImpl implements ICarreraService{

    @Autowired
    private ICarreraDao carreraDao;

    @Autowired
    private IInstitutoDao institutoDao;

    @Override
    public List<Carrera> findAll() {
        return (List<Carrera>) carreraDao.findAll();
    }

    @Override
    public Carrera save(Carrera carrera) {
        return carreraDao.save(carrera);
    }

    @Override
    public Carrera findOne(Long id) {
        return carreraDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        carreraDao.deleteById(id);
    }

    @Override
    public List<Instituto> findAllInstitutos() {
        return null;
    }

    @Override
    public List<Instituto> findInstByCarreraId(Long id) {
        return this.institutoDao.findInstitutoByCarrera(id);
    }

    @Override
    public Carrera findById(Long id) {
        return this.carreraDao.findById(id).orElse(null);
    }
}
