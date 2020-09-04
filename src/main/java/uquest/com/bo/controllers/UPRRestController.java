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
import uquest.com.bo.models.entity.Encuesta;
import uquest.com.bo.models.entity.UPR;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.projection.UPRgroup;
import uquest.com.bo.models.services.upr.IUPRService;

import javax.validation.Valid;
import java.util.ArrayList;
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
    public List<UPR> index() {
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

        List<UPRgroup> upr = null;
        Map<String, Object> response = new HashMap<>();
        try {
            Integer total = 0;
            upr = uprService.findTotalRespuestasByEncuestaId(id);
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

//    @PostMapping("/solve")
//    private ResponseEntity<?> create(@Valid @RequestBody List<UPR> upr, BindingResult result){
//
//        log.info("Entra al BE");
//        UPR uprNew;
//        List<UPR> uprArray;
//        Map<String, Object> response = new HashMap<>();
//
//        if (result.hasErrors()) {
//            List<String> errors = new ArrayList<>();
//            for (FieldError err : result.getFieldErrors()) {
//                errors.add("El campo: '" + err.getField() + "' '" + err.getDefaultMessage());
//            }
//            response.put("errors", errors);
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
//        }
//        try {
//
////            uprNew = uprService.save(upr1);
////            uprArray[i] = uprNew;
//
////            log.info(encuestaNew.toString());
//        } catch (DataAccessException e) {
//            response.put("mensaje", "Error al realizar el insert en la Base de datos para UPR");
//            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        response.put("upr", uprArray);
//        response.put("mensaje", "El registro de la encuesta fue satisfactoriamente");
//        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
//    }

    // TODO error al crear @ManyToOne en UPR
    @PostMapping(value = {"/", ""})
    public ResponseEntity<?> create(@Valid @RequestBody UPR upr, BindingResult result) {
        UPR uprNew;
        Map<String, Object> response = new HashMap<>();

        // sending error to FE
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add("El campo: '" + err.getField() + "' '" + err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            uprNew = uprService.save(upr);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("upr", uprNew);
        response.put("mensaje", "Se realizo el registro de upr individual correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }
}
