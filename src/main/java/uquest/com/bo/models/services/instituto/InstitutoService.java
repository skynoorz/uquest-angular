package uquest.com.bo.models.services.instituto;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IInstitutoDao;
import uquest.com.bo.models.entity.Instituto;

@Service
@Transactional
public class InstitutoService {

    private final IInstitutoDao institutoDao;

    public InstitutoService(IInstitutoDao institutoDao) {
        this.institutoDao = institutoDao;
    }

    public Instituto save(Instituto instituto) {
        return institutoDao.save(instituto);
    }

    public void delete(Instituto instituto){institutoDao.delete(instituto);}

    public void deleteById(Long id){institutoDao.deleteById(id);}

    public Instituto findById(Long id) {
        return institutoDao.findById(id).orElse(null);
    }
}
