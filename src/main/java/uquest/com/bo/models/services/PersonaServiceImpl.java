package uquest.com.bo.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IPersonaDao;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Persona;

import java.util.List;

@Service
public class PersonaServiceImpl implements IPersonaService {

    @Autowired
    private IPersonaDao personaDao;

    @Override
    @Transactional
    public List<Persona> findAll() {
        return (List<Persona>) personaDao.findAll();
    }

    @Override
    @Transactional
    public Page<Persona> findAll(Pageable pageable) {
        return personaDao.findAll(pageable);
    }

    @Override
    @Transactional
    public Persona findById(Long id) {
        return personaDao.findById(id).orElse(null);
    }

    @Override
    public Persona save(Persona persona) {
        return personaDao.save(persona);
    }

    @Override
    public void delete(Long id) {
        personaDao.deleteById(id);
    }

    @Transactional
    @Override
    public List<Carrera> findAllCarreras() {
        return personaDao.findAllCarreras();
    }

    @Override
    public List<Instituto> findAllInstitutos() {
        return personaDao.findAllInstitutos();
    }
}
