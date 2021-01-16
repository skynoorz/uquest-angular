package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Encuesta;

import java.util.List;

public interface IEncuestaDao extends CrudRepository<Encuesta, Long> {

//    @Query("from Encuesta  where Usuario.id = ?1")
    @Query("select e from Encuesta e, Usuario u where e.usuario.id = u.id")
    public List<Encuesta> findAllEncuestasByUsuarioId();

    @Query("select e from Encuesta e, Usuario u where e.usuario.username = u.username and u.username = ?1")
    public List<Encuesta> findAllEncuestasByUsername(String user);

    @Query("from Encuesta where tipo='Abierto'")
    public List<Encuesta> findAllPublic();

    @Query(value = "select id from encuestas where fecha_ini < CURRENT_TIMESTAMP and fecha_fin > CURRENT_TIMESTAMP;",nativeQuery = true)
    public List<Long> availables();

    @Modifying
    @Query(value = "update encuestas set fecha_fin = '1999-01-01' where id = ?1",nativeQuery = true)
    public void finalizar(Long id);
}
