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
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Persona;
import uquest.com.bo.models.services.IUploadFileService;
import uquest.com.bo.models.services.IPersonaService;

import javax.validation.Valid;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class PersonaRestController {

    private final Logger log = LoggerFactory.getLogger(PersonaRestController.class);

    @Autowired
    private IUploadFileService uploadFileService;

    @Autowired
    private IPersonaService personaService;

    @GetMapping("/personas")
    public List<Persona> index() {
        return personaService.findAll();
    }

    @GetMapping("/personas/page/{page}")
    public Page<Persona> index(@PathVariable Integer page) {
        Pageable pageable = PageRequest.of(page, 3);
        return personaService.findAll(pageable);
    }

    @GetMapping("/personas/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        Persona persona = null;
        Map<String, Object> response = new HashMap<>();
        try {
            persona = personaService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (persona == null) {
            response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Persona>(persona, HttpStatus.OK);
    }

    @PostMapping("/personas")
//    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> create(@Valid @RequestBody Persona persona, BindingResult result) {
        Persona personaNew;
        Map<String, Object> response = new HashMap<>();
//        persona.setEnabled(true);
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
            personaNew = personaService.save(persona);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("persona", personaNew);
        response.put("mensaje", "El registro del persona correctamente");
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @PutMapping("/personas/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Persona persona, BindingResult result, @PathVariable Long id) {

        Persona object = personaService.findById(id);
        Persona objectUpdated = null;
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

        if (object == null) {
            response.put("mensaje", "Error, no se pudo editar el cliente con id: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        try {
            object.setCi(persona.getCi());
            object.setApellidoMat(persona.getApellidoMat());
            object.setApellidoPat(persona.getApellidoPat());
            object.setNombres(persona.getNombres());
            object.setSexo(persona.getSexo());
            object.setEmail(persona.getEmail());
            object.setEnabled(persona.isEnabled());
            object.setFnac(persona.getFnac());

            object.setUsername(persona.getUsername());
            object.setPassword(persona.getPassword());

            object.setEncuestas(persona.getEncuestas());
            object.setCarrera(persona.getCarrera());
//            object.setCarreras(persona.getCarreras());
//            object.setInstitutos(persona.getInstitutos());
            objectUpdated = personaService.save(object);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el update en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro del persona se actualizo correctamente");
        response.put("persona", objectUpdated);
        return new ResponseEntity<Map>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/personas/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            // BORRAR IMAGEN
            Persona persona = personaService.findById(id);
            String nombreFotoAnterior = persona.getFoto();

            uploadFileService.eliminar(nombreFotoAnterior);

            // BORRAR CLIENTE
            personaService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el cliente en la Base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El registro de la persona con id: '".concat(id.toString().concat("' se elimino correctamente")));
        return new ResponseEntity<Map>(response, HttpStatus.OK);
    }

    @PostMapping("/personas/upload")
    public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        Persona persona = personaService.findById(id);

        if (!archivo.isEmpty()) {
            String nombreArchivo =null;
            try {
                nombreArchivo = uploadFileService.copiar(archivo);
            }catch (IOException e){
                response.put("mensaje", "Error al subir la imagen del persona");
                response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            String nombreFotoAnterior = persona.getFoto();
            uploadFileService.eliminar(nombreFotoAnterior);

            persona.setFoto(nombreArchivo);
            personaService.save(persona);

            response.put("persona", persona);
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

    @GetMapping("/personas/carreras")
    public List<Carrera> listarCarreras() {
        return personaService.findAllCarreras();
    }

    @GetMapping("/personas/institutos")
    public List<Instituto> listarInstitutos() {
        return personaService.findAllInstitutos();
    }
}
