package uquest.com.bo.models.services.opcion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.IOpcionDao;
import uquest.com.bo.models.entity.Opcion;

import java.util.List;

@Service
public class IOpcionServiceImpl implements IOpcionService {

    @Autowired
    private IOpcionDao opcionDao;

    @Override
    public List<Opcion> findAll() {
        return (List<Opcion>) opcionDao.findAll();
    }

    @Override
    public Opcion save(Opcion opcion) {
        return opcionDao.save(opcion);
    }

    @Override
    public Opcion findOne(Long id) {
        return opcionDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        opcionDao.deleteById(id);
    }

    @Override
    public List<Long> getIdByTexto(String texto) {
        return opcionDao.getIdByTexto(texto);
    }
}
