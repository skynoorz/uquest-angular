package uquest.com.bo.controllers;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.services.IUsuarioService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class UsuarioRestController {

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping("/usuarios")
    public List<Usuario> index() {
        return usuarioService.findAll();
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        Usuario usuario = null;
        Map<String, Object> response = new HashMap<>();
        try {
            usuario = usuarioService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (usuario == null) {
            response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
    }

    @PostMapping("/usuarios")
//    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Valid @RequestBody Usuario usuario, BindingResult result) {
        Usuario usuarioNew;
        Map<String, Object> response = new HashMap<>();
//        usuario.setEnabled(true);
        // sending error to FE
        if (result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for (FieldError err: result.getFieldErrors()){
                errors.add("El campo: '"+err.getField()+"' '"+err.getDefaultMessage());
            }
            response.put("errors",errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            usuarioNew = usuarioService.save(usuario);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("usuario", usuarioNew);
        response.put("mensaje", "El registro del usuario correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Usuario usuario, BindingResult result, @PathVariable Long id) {

        Usuario object = usuarioService.findById(id);
        Usuario objectUpdated = null;
        Map<String, Object> response = new HashMap<>();

        // sending error to FE
        if (result.hasErrors()){
            List<String> errors = new ArrayList<>();
            for (FieldError err: result.getFieldErrors()){
                errors.add("El campo: '"+err.getField()+"' '"+err.getDefaultMessage());
            }
            response.put("errors",errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (object == null) {
            response.put("mensaje", "Error, no se pudo editar el cliente con id: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        try {
            object.setCi(usuario.getCi());
            object.setApellidoMat(usuario.getApellidoMat());
            object.setApellidoPat(usuario.getApellidoPat());
            object.setNombres(usuario.getNombres());
            object.setSexo(usuario.getSexo());
            object.setEmail(usuario.getEmail());
            object.setEnabled(usuario.isEnabled());
            object.setFnac(usuario.getFnac());

            object.setUsername(usuario.getUsername());
            object.setPassword(usuario.getPassword());

            object.setEncuestas(usuario.getEncuestas());
            object.setCarreras(usuario.getCarreras());
            object.setInstitutos(usuario.getInstitutos());
            objectUpdated = usuarioService.save(object);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el update en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro del usuario se actualizo correctamente");
        response.put("usuario", objectUpdated);
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            usuarioService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el cliente en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro del usuario con id: '".concat(id.toString().concat("' se elimino correctamente")));
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }
}
