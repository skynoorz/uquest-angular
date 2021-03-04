package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Instituto;

import java.util.List;

public interface IInstitutoDao extends CrudRepository<Instituto, Long> {

    @Query(value = "select * from institutos where carrera_id = ?1", nativeQuery = true)
    public List<Instituto> findInstitutoByCarrera(Long id);
}
