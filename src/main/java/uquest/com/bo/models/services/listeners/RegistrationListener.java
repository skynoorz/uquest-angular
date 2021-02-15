package uquest.com.bo.models.services.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import uquest.com.bo.models.entity.Usuario;

import java.util.UUID;

@Component
public class RegistrationListener implements
        ApplicationListener<OnRegistrationCompleteEvent> {

//    @Autowired
//    private IUserService service;

//    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${server.url}")
    private String baseURL;

    @Value("${frontend.url}")
    private String baseURLAngular;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        Usuario user = event.getUser();
        String token = user.getToken();
//        service.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "UQUEST - Confirmación de Registro";
        String confirmationUrl = event.getAppUrl() + "/#/regitrationConfirm?token=" + token;
//        String message = messages.getMessage("message.regSucc", null, event.getLocale());

        String message = "Ingrese al siguiente enlace para validar su cuenta en UQUEST! : ";
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\r\n" + baseURLAngular + confirmationUrl);
        mailSender.send(email);
    }
}
