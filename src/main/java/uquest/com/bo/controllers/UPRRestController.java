package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.UPR;
import uquest.com.bo.models.projection.UPRgroup;
import uquest.com.bo.models.services.upr.IUPRService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/upr")
public class UPRRestController {

    private final Logger log = LoggerFactory.getLogger(UsuarioRestController.class);

    @Autowired
    private IUPRService uprService;

    @GetMapping("/")
    public List<UPR> index(){
        return uprService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        List<UPR> upr = null;
        Map<String, Object> response = new HashMap<>();
        try {
            upr = uprService.findByEncuestaId(id);
//            usuario.setEncuestas(null);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (upr == null) {
            response.put("mensaje", "El upr con encuesta ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<List<UPR>>(upr, HttpStatus.OK);
    }
    @GetMapping("/total/{id}")
    public ResponseEntity<?> count(@PathVariable Long id) {

//        List<UPR> upr = null;
        List<UPRgroup> upr = null;
        Map<String, Object> response = new HashMap<>();
        try {
            upr = uprService.findTotalRespuestasByEncuestaId(id);
//            upr.forEach(upr1 -> {
//                log.warn(upr1.getId().toString());
//            });
//            usuario.setEncuestas(null);
            log.info("entra");
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (upr == null) {
            response.put("mensaje", "El upr con encuesta ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(upr, HttpStatus.OK);
    }

    public class TemporalUPR {
        private Integer opcion_id;
        private Integer pregunta_id;
        private Integer total;
    }
}
