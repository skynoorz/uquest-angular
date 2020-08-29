package uquest.com.bo.models.services.upr;

import uquest.com.bo.models.entity.UPR;
import uquest.com.bo.models.projection.UPRgroup;

import java.util.List;

public interface IUPRService {
    public List<UPR> findAll();

    public void save(UPR encuesta);

    public UPR findOne(Long id);

    public void delete(Long id);

    public List<UPR> findByEncuestaId(Long id);

    public List<UPRgroup> findTotalRespuestasByEncuestaId(Long id);
}
