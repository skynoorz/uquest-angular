package uquest.com.bo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.services.IUsuarioService;

import java.util.HashMap;
import java.util.Map;

@Controller
public class RegistrationController {
    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping("/regitrationConfirm")
    public ResponseEntity<?> confirmRegistration(@RequestParam("token") String token) {

        Map<String, Object> response = new HashMap<>();

        if (token == null) {
            response.put("error", "No se obtuvo ningun token");
            return new ResponseEntity<Map>(response, HttpStatus.BAD_REQUEST);
        }

        Usuario user = usuarioService.findUserByToken(token);
        user.setEnabled(true);
        usuarioService.save(user);
        response.put("mensaje", "Se realizo el registro satisfactorio");
        return new ResponseEntity<Map>(response, HttpStatus.OK);
//        return "redirect:/#/message/email/success";
    }


//    @GetMapping("/regitrationConfirm")
//    public String confirmRegistration
//            (WebRequest request, Model model, @RequestParam("token") String token) {
//
//
//        if (token == null) {
//            return "redirect:/";
//        }
//
//        Usuario user = usuarioService.findUserByToken(token);
//        user.setEnabled(true);
//        usuarioService.save(user);
//        return "redirect:/#/message/email/success";
//    }
}
