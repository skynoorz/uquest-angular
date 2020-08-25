package uquest.com.bo.models.services.categoria;

import uquest.com.bo.models.entity.Categoria;

import java.util.List;

public interface ICategoriaService {
    public List<Categoria> findAll();

    public Categoria save(Categoria categoria);

    public Categoria findOne(Long id);

    public void delete(Long id);

}
