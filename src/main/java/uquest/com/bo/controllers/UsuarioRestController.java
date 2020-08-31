package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uquest.com.bo.models.entity.*;
import uquest.com.bo.models.services.IUploadFileService;
import uquest.com.bo.models.services.IUsuarioService;
import uquest.com.bo.models.services.encuesta.IEncuestaService;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class UsuarioRestController {

    private final Logger log = LoggerFactory.getLogger(UsuarioRestController.class);

    @Autowired
    private IUploadFileService uploadFileService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private IEncuestaService encuestaService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/usuarios")
    public List<Usuario> index() {
        return usuarioService.findAll();
    }

    @GetMapping("/usuarios/page/{page}")
    public Page<Usuario> index(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 3);
        return usuarioService.findAll(pageable);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        Usuario usuario = null;
        Map<String, Object> response = new HashMap<>();
        try {
            usuario = usuarioService.findById(id);
            usuario.setPassword("");
//            log.info(usuario.getPassword());
//            passwordEncoder.matches('',usuario.getPassword());
//            usuario.setEncuestas(null);
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
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add("El campo: '" + err.getField() + "' '" + err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        usuario.setEnabled(true);
        try {
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
            if (usuario.getInstituto().getId() == null)
                usuario.setInstituto(null);
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
        if (result.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError err : result.getFieldErrors()) {
                errors.add("El campo: '" + err.getField() + "' '" + err.getDefaultMessage());
            }
            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (usuario.getId() == null) {
            response.put("mensaje", "Error, no se pudo editar el cliente con id: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        try {
            if (usuario.getInstituto().getId() == null)
                usuario.setInstituto(null);
            String encodedPass = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(encodedPass);
            objectUpdated = usuarioService.save(usuario);
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
            // BORRAR IMAGEN
            Usuario usuario = usuarioService.findById(id);
            String nombreFotoAnterior = usuario.getFoto();

            uploadFileService.eliminar(nombreFotoAnterior);

            // BORRAR CLIENTE
            usuarioService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el cliente en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro de la usuario con id: '".concat(id.toString().concat("' se elimino correctamente")));
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @PostMapping("/usuarios/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = usuarioService.findById(id);

        if (!archivo.isEmpty()) {
            String nombreArchivo =null;
            try {
                nombreArchivo = uploadFileService.copiar(archivo);
            }catch (IOException e){
                response.put("mensaje", "Error al subir la imagen del usuario");
                response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            String nombreFotoAnterior = usuario.getFoto();
            uploadFileService.eliminar(nombreFotoAnterior);

            usuario.setFoto(nombreArchivo);
            usuarioService.save(usuario);

            response.put("usuario", usuario);
            response.put("mensaje", "se subio correctamente la imagen: " + nombreArchivo);
        }
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    @GetMapping("/uploads/img/{nombreFoto:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreFoto) {
        Resource recurso = null;

        try {
            recurso = uploadFileService.cargar(nombreFoto);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        HttpHeaders cabecera = new HttpHeaders();
        cabecera.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + recurso.getFilename() + "\"");
        return new ResponseEntity<Resource>(recurso, cabecera, HttpStatus.OK);
    }

    @GetMapping("/usuarios/carreras")
    public List<Carrera> listarCarreras() {
        return usuarioService.findAllCarreras();
    }

    @GetMapping("/usuarios/institutos")
    public List<Instituto> listarInstitutos() {
        return usuarioService.findAllInstitutos();
    }

    @GetMapping("/usuarios/roles")
    public List<Role> listarRoles(){
        return usuarioService.findAllRoles();
    }

    @GetMapping("/usuarios/userexist/{username}")
    public ResponseEntity<Boolean> datauser(@PathVariable String username){
        Usuario usuarioNew = usuarioService.findByUsername(username);
        return ResponseEntity.ok(Optional.ofNullable(usuarioNew).isEmpty());
    }

    @GetMapping("/usuarios/emailexist/{email}")
    public ResponseEntity<Boolean> dataemail(@PathVariable String email){
        Usuario usuarioNew = usuarioService.findByEmail(email);
        return ResponseEntity.ok(Optional.ofNullable(usuarioNew).isEmpty());
    }

    @GetMapping("/usuarios/encuestas/{id}")
    public List<Encuesta> encuestas(@PathVariable Long id){
        return encuestaService.findAllEncuestasByUsuarioId(id);
    }

    @GetMapping("/usuarios/encuestas/user/{user}")
    public List<Encuesta> encuestas(@PathVariable String user){
        return encuestaService.findAllEncuestasByUsername(user);
    }
}
