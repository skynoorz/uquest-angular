package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.services.carrera.ICarreraService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class CarreraRestController {

    private final Logger log = LoggerFactory.getLogger(UsuarioRestController.class);

    @Autowired
    private ICarreraService carreraService;

    @GetMapping("/carreras")
    public List<Carrera> index() {
        return carreraService.findAll();
    }

    @GetMapping("/carreras/institutos/{id}")
    public List<Instituto> show(@PathVariable Long id) {

        return carreraService.findInstByCarreraId(id);
//        return null;
//        List<Instituto> institutos = null;
//        Map<String, Object> response = new HashMap<>();
//        try {
//            institutos = carreraService.findInstByCarreraId(id);
////            usuario.setEncuestas(null);
//        } catch (DataAccessException e) {
//            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
//            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//        if (institutos == null) {
//            response.put("mensaje", "el instituto con ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
//        }
//
//        return new ResponseEntity<Instituto>(institutos, HttpStatus.OK);
    }

    @GetMapping("/carreras/id/{id}")
    public Carrera carreraById(@PathVariable Long id) {
        return carreraService.findById(id);
    }

    @PostMapping("/carreras")
    private ResponseEntity<?> create(@Valid @RequestBody Carrera carrera) {

        Carrera carreraNew;
        Map<String, Object> response = new HashMap<>();

        try {
            carreraNew = carreraService.save(carrera);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("carrera", carreraNew);
        response.put("mensaje", "El registro de la categoria fue satisfactorio.");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/carreras/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            carreraService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar la carrera en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro de la carrera se elimino correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }
}
