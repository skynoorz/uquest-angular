package uquest.com.bo.models.services.upr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.dao.IUPRDao;
import uquest.com.bo.models.entity.UPR;

import java.util.List;

@Service
public class IUPRServiceImpl implements IUPRService{

    @Autowired
    private IUPRDao uprDao;

    @Override
    public List<UPR> findAll() {
        return (List<UPR>) uprDao.findAll();
    }

    @Override
    public void save(UPR upr) {
        uprDao.save(upr);
    }

    @Override
    public UPR findOne(Long id) {
        return uprDao.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        uprDao.deleteById(id);
    }

    @Override
    public List<UPR> findByEncuestaId(Long id) {
        return uprDao.findByEncuestaId(id);
    }

    @Override
    public List<Object> findTotalRespuestasByEncuestaId(Long id) {
        return uprDao.findTotalRespuestasByEncuestaId(id);
    }
}
