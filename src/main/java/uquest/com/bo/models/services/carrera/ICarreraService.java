package uquest.com.bo.models.services.carrera;

import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;

import java.util.List;

public interface ICarreraService {
    public List<Carrera> findAll();

    public Carrera save(Carrera carrera);

    public Carrera findOne(Long id);

    public void delete(Long id);

    public List<Instituto> findAllInstitutos();

    public List<Instituto> findInstByCarreraId(Long id);

    public Carrera findById(Long id);
}
