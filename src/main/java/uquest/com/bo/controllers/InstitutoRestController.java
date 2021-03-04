package uquest.com.bo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.services.instituto.InstitutoService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class InstitutoRestController {

    @Autowired
    private InstitutoService institutoService;

    @PostMapping("/institutos")
    private ResponseEntity<?> create(@Valid @RequestBody Instituto instituto) {

        Instituto institutoNew;
        Map<String, Object> response = new HashMap<>();

        try {
            institutoNew = institutoService.save(instituto);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("instituto", institutoNew);
        response.put("mensaje", "El registro del instituto fue satisfactorio.");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @GetMapping("/institutos/id/{id}")
    public ResponseEntity<?> institutoById(@PathVariable Long id) {
        Instituto instituto = null;
        Map<String, Object> response = new HashMap<>();
        try {
            instituto = institutoService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (instituto == null) {
            response.put("mensaje", "El instituto ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Instituto>(instituto, HttpStatus.OK);
    }

    @DeleteMapping("/institutos/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            institutoService.deleteById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el instituto en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El instituto con id: '".concat(id.toString().concat("' se elimino correctamente")));
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }
}
