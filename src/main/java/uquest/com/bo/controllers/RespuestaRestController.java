package uquest.com.bo.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;
import uquest.com.bo.models.entity.Respuesta;
import uquest.com.bo.models.services.respuesta.RespuestaService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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

    @GetMapping("/usuarios/encuesta/uid/{encuestaUID}")
    public ResponseEntity<List<Long>> findUsersWhoAnsweredEncuestaUID(@PathVariable("encuestaUID") String encuestaUID) {
        return ResponseEntity.ok(
                respuestaService.findAllUsersAnsweredByEncuestaUID(encuestaUID)
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

    @GetMapping("/encuesta/results/export/{encuestaId}")
    public void exportToCSV(HttpServletResponse response,@PathVariable("encuestaId") Long encuestaId) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=respuestas_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<Respuesta> listRespuestas = respuestaService.getAllRespuestasByEncuesta(encuestaId);

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"Respuesta Id", "Valor Seleccionado", "Opcion Id", "Pregunta Id", "Texto", "Usuario id"};
        String[] nameMapping = {"id", "num_value", "opcion_id", "pregunta_id", "text_value","usuario_id"};

        csvWriter.writeHeader(csvHeader);

        for (Respuesta respuesta : listRespuestas) {
            csvWriter.write(respuesta, nameMapping);
        }

        csvWriter.close();

    }

}
