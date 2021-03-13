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
import java.util.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class EncuestaRestController {

    private final Logger log = LoggerFactory.getLogger(UsuarioRestController.class);

    @Autowired
    private IEncuestaService encuestaService;

    @Autowired
    private IRespuestaDao respuestaDao;

    @GetMapping("/encuestas")
    public List<Encuesta> encuestasTodas() {
        return this.encuestaService.findAll();
    }

    @PostMapping("/encuestas")
    private ResponseEntity<?> create(@Valid @RequestBody Encuesta encuesta, BindingResult result) {

        log.info("Entra al BE");
        Encuesta encuestaNew;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add(err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            encuesta.setUID(UUID.randomUUID().toString());
            encuestaNew = encuestaService.save(encuesta);
//            log.info(encuestaNew.toString());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("encuesta", encuestaNew);
        response.put("mensaje", "El registro de la encuesta fue satisfactorio.");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @PostMapping("/encuestas/up-date")
    private ResponseEntity<?> updateDate(@Valid @RequestBody Encuesta encuesta, BindingResult result) {

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add(err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            encuestaService.updateDate(encuesta.getFechaIni(), encuesta.getFechaFin(), encuesta.getId());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar update en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "Se actualizo las fechas correctamente.");
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

    @GetMapping("/encuestas/uid/{uid}")
    public Encuesta encuestasUID(@PathVariable String uid) {
        return encuestaService.findByUID(uid);
    }

    @GetMapping("/encuestas/available")
    public List<Long> encuestasDate() {
        return encuestaService.available();
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

    @GetMapping("/respuestas-total/encuesta/{id}")
    public ResponseEntity<?> respuestasTotal(@PathVariable Long id) {
        List<RespuestasStats> respuestasNew;
        Long total;
        Map<String, Object> response = new HashMap<>();

        try {
            total = respuestaDao.getRespuestasTotalByEncuestaId(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "No existen respuestas para la encuesta id: "+id);
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("respuestas", total);
        return new ResponseEntity<Map>(response, HttpStatus.OK);

    }

    @DeleteMapping("/encuestas/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
//            String nombreFotoAnterior = usuario.getFoto();
//            uploadFileService.eliminar(nombreFotoAnterior);
            encuestaService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar la encuesta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro de la encuesta con id: '".concat(id.toString().concat("' se elimino correctamente")));
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @GetMapping("/encuestas/finalizar/{id}")
    public ResponseEntity<?> finalizar(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            encuestaService.finalizar(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al finalizar la encuesta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "La encuesta se finalizo correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @GetMapping("/encuestas/carrera/{id}")
    public ResponseEntity<?> encuestasByCarrera(@PathVariable Long id) {
        List<Encuesta> encuestas;
        Map<String, Object> response = new HashMap<>();

        try {
            encuestas = encuestaService.getEncuestasByCarreraList(id);
//            log.info(encuestaNew.toString());
        } catch (DataAccessException e) {
            response.put("mensaje", "No existen encuestas para la carrera solicitada");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
//        if (encuestas.isEmpty()){
//            response.put("mensaje", "No existen encuestas para la carrera solicitada");
////            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
//        }
        response.put("encuestas", encuestas);
//        response.put("mensaje", "El registro de la encuesta fue satisfactoriamente");
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }




}
