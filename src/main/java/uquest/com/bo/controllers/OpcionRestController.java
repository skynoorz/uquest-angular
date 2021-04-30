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
import uquest.com.bo.models.entity.Opcion;
import uquest.com.bo.models.services.opcion.IOpcionService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class OpcionRestController {

    private final Logger log = LoggerFactory.getLogger(OpcionRestController.class);

    @Autowired
    private IOpcionService opcionService;

    @PostMapping("/opciones")
    private ResponseEntity<?> create(@Valid @RequestBody List<Opcion> opcion, BindingResult result){

        List<Opcion> opcionNew = new ArrayList<>();
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
            opcion.forEach(opcion1 -> {
                opcionNew.add(opcionService.save(opcion1));
            });
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            log.error(e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("opcion", opcionNew);
        response.put("mensaje", "El registro de las opciones fue satisfactorio");
        log.info("El registro de las opciones fue satisfactorio, opciones: "+opcion.toString());
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @GetMapping("/opciones/{texto}")
    public List<Long> opciones(@PathVariable String texto){
        return opcionService.getIdByTexto(texto);
    }
}
