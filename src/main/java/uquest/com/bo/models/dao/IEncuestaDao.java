package uquest.com.bo.models.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import uquest.com.bo.models.entity.Encuesta;

import java.util.Date;
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

    @Query(value = "from Encuesta e, Usuario u, Carrera c where e.usuario = u and c = u.carrera and u.carrera.id = ?1")
    List<Encuesta> getAllEncuestasByCarreraId(Long id);

    @Query(value = "select DISTINCT e.* from encuestas e, encuestas_carreras ec where e.id = ec.encuesta_id and ec.carrera_id = ?1 and e.tipo = 'Abierto'", nativeQuery = true)
    List<Encuesta> getAllEncuestasByCarreraList(Long id);

    @Query("from Encuesta where UID=?1")
    Encuesta findByUID(String uid);

    @Modifying
    @Query(value = "UPDATE encuestas\n" +
            " Set fecha_ini = ?1\n" +
            "    ,fecha_fin =  ?2\n" +
            " WHERE encuestas.id = ?3", nativeQuery = true)
    public void updateDates(Date fechaIni, Date fechaFin, Long id);
}
