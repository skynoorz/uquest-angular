package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import uquest.com.bo.models.entity.Respuesta;
import uquest.com.bo.models.services.respuesta.RespuestaService;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@Controller
@RequestMapping("/api/respuesta")
public class RespuestaRestController {

    private final Logger log = LoggerFactory.getLogger(RespuestaRestController.class);

    private final RespuestaService respuestaService;

    public RespuestaRestController(RespuestaService respuestaService) {
        this.respuestaService = respuestaService;
    }

    @GetMapping("/pregunta/{preguntaId}")
    public ResponseEntity<List<Respuesta>> findAllByPregunta(@PathVariable("preguntaId") Long preguntaId) {
        return ResponseEntity.ok(
            respuestaService.getAllRespuestasByPregunta(preguntaId)
        );
    }

    @GetMapping("/encuesta/{encuestaId}")
    public ResponseEntity<List<Respuesta>> findAllByEncuesta(@PathVariable("encuestaId") Long encuestaId) {
        return ResponseEntity.ok(
            respuestaService.getAllRespuestasByEncuesta(encuestaId)
        );
    }

    @PostMapping("/all")
    public ResponseEntity saveAllRespuestas(@Valid @RequestBody List<Respuesta> respuestas) {
        log.debug("Saving respuestas: {}", respuestas);
        respuestaService.saveRespuestas(respuestas);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/usuarios/encuesta/{encuestaId}")
    public ResponseEntity<List<Long>> findUsersWhoAnsweredEncuesta(@PathVariable("encuestaId") Long encuestaId) {
        return ResponseEntity.ok(
                respuestaService.findAllUsersAnsweredByEncuesta(encuestaId)
        );
    }

    @GetMapping("/usuarios/pregunta/{preguntaId}")
    public ResponseEntity<List<String>> findRespuestasByPregunta(@PathVariable("preguntaId") Long preguntaId) {
        return ResponseEntity.ok(
                respuestaService.findTextValueByPregunta(preguntaId)
        );
    }

    @GetMapping("/usuarios/pregunta/public/{preguntaId}")
    public ResponseEntity<List<String>> findRespuestasPublicByPregunta(@PathVariable("preguntaId") Long preguntaId) {
        return ResponseEntity.ok(
                respuestaService.findTextValueByPregunta(preguntaId)
        );
    }

}
