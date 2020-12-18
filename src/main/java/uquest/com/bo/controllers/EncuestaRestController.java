package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.dao.IRespuestaDao;
import uquest.com.bo.models.entity.Encuesta;
import uquest.com.bo.models.projection.RespuestasStats;
import uquest.com.bo.models.services.encuesta.IEncuestaService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class EncuestaRestController {

    private final Logger log = LoggerFactory.getLogger(UsuarioRestController.class);

    @Autowired
    private IEncuestaService encuestaService;

    @Autowired
    private IRespuestaDao respuestaDao;

    @PostMapping("/encuestas")
    private ResponseEntity<?> create(@Valid @RequestBody Encuesta encuesta, BindingResult result) {

        log.info("Entra al BE");
        Encuesta encuestaNew;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add("El campo: '" + err.getField() + "' '" + err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            encuestaNew = encuestaService.save(encuesta);
//            log.info(encuestaNew.toString());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("encuesta", encuestaNew);
        response.put("mensaje", "El registro de la encuesta fue satisfactoriamente");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @GetMapping("/encuestas/public")
    public List<Encuesta> encuestasPublic() {
        return this.encuestaService.findAllPublic();
    }

    @GetMapping("/encuestas/{id}")
    public Encuesta encuestas(@PathVariable Long id) {
        return encuestaService.findOne(id);
    }

    @GetMapping("/respuestas/encuesta/{id}")
    public ResponseEntity<?> respuestas(@PathVariable Long id) {
        List<RespuestasStats> respuestasNew;
        Map<String, Object> response = new HashMap<>();

        try {
            respuestasNew = respuestaDao.getRespuestasOp(id);
//            log.info(encuestaNew.toString());
        } catch (DataAccessException e) {
            response.put("mensaje", "No existen respuestas para la encuesta id: "+id);
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("respuestas", respuestasNew);
//        response.put("mensaje", "El registro de la encuesta fue satisfactoriamente");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);

    }
}
