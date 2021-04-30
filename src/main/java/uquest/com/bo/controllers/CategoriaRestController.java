package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.Categoria;
import uquest.com.bo.models.services.categoria.ICategoriaService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class CategoriaRestController {

    private final Logger log = LoggerFactory.getLogger(CategoriaRestController.class);

    @Autowired
    private ICategoriaService categoriaService;

    @GetMapping("/categorias")
    public List<Categoria> index() {
        return categoriaService.findAll();
    }

    @DeleteMapping("/categorias/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            categoriaService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar la categoria en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            log.error(e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro de la categoria se elimino correctamente");
        log.info("El registro de la categoria se elimino correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @PostMapping("/categorias")
    private ResponseEntity<?> create(@Valid @RequestBody Categoria categoria, BindingResult result) {

        Categoria categoriaNew;
        Map<String, Object> response = new HashMap<>();

        try {
            categoriaNew = categoriaService.save(categoria);

        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            log.error(e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("categoria", categoriaNew);
        response.put("mensaje", "El registro de la categoria fue satisfactorio.");
        log.info("El registro de la categoria fue satisfactorio.");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

}
