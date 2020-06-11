package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;

import java.util.List;

public interface ICarreraDao extends CrudRepository<Carrera, Long> {

    @Query("from Carrera")
    public List<Carrera> findAllCarreras();

//    @Query("select Instituto from Carrera where id = ?1")
//    public Instituto findInstByCarreraid(Long id);
}
