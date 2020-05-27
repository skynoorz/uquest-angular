package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;

public interface IUsuarioDao extends JpaRepository<Usuario, Long> {
    @Query("from Carrera")
    public List<Carrera> findAllCarreras();

    @Query("from Instituto")
    public List<Instituto> findAllInstitutos();
}
