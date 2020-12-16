package uquest.com.bo.models.services.opcion;

import uquest.com.bo.models.entity.Opcion;

import java.util.List;

public interface IOpcionService {
    public List<Opcion> findAll();

    public Opcion save(Opcion opcion);

    public Opcion findOne(Long id);

    public void delete(Long id);

    public List<Long> getIdByTexto(String texto);

}
