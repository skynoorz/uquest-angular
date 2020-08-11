package uquest.com.bo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.UPR;
import uquest.com.bo.models.services.upr.IUPRService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class UPRRestController {

    @Autowired
    private IUPRService uprService;

    @GetMapping("/upr")
    public List<UPR> index(){
        return uprService.findAll();
    }

    @GetMapping("/upr/{id}")
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
}
