package uquest.com.bo.models.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Persona;

import java.util.List;

public interface IPersonaService {

    public List<Persona> findAll();

    public Page<Persona> findAll(Pageable pageable);

    public Persona findById(Long id);

    public Persona save(Persona persona);

    public void delete(Long id);

    public List<Carrera> findAllCarreras();

    public List<Instituto> findAllInstitutos();
}
