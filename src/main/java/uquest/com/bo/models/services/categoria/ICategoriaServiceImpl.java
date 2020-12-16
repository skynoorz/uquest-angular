package uquest.com.bo.models.services.categoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.ICategoriaDao;
import uquest.com.bo.models.entity.Categoria;

import java.util.List;

@Service
public class ICategoriaServiceImpl implements ICategoriaService{

    @Autowired
    private ICategoriaDao categoriaDao;

    @Override
    public List<Categoria> findAll() {
        return (List<Categoria>) categoriaDao.findAll();
    }

    @Override
    public Categoria save(Categoria categoria) {
        return categoriaDao.save(categoria);
    }

    @Override
    public Categoria findOne(Long id) {
        return categoriaDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        categoriaDao.deleteById(id);
    }
}
