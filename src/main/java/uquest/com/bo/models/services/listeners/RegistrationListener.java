package uquest.com.bo.models.services.listeners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import uquest.com.bo.models.entity.Usuario;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

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

        String recipientAddress = user.getEmail();
        String subject = "UQUEST - Confirmación de Registro";
        String confirmationUrl = event.getAppUrl() + "/#/regitrationConfirm?token=" + token;
        String message = "Ingrese al siguiente enlace para validar su cuenta en UQUEST! : ";

        try {
            MimeMessage mime = this.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true);
            helper.setTo(recipientAddress);
            helper.setSubject(subject);
            helper.setText("<div style=\"width: 600px; margin: 0 auto;\">\n" +
                    "  <div style='text-align:center;background:#505763;font-size:12pt;font-weight:bold;color:white;padding:10px;'>\n" +
                    "    UQUEST - FCPN\n" +
                    "  </div>\n" +
                    "  <div style='background:#8995AB;text-align: center; padding: 10px; color: white;'>\n" +
                    "    <p>"+message+"</p>\n" +
                    "    <div style='margin: 20px 0 20px 0'>\n" +
                    "      <a href='"+baseURLAngular + confirmationUrl+"'>\n" +
                    "        <button type='submit' style='color: white; font-weight: bold; letter-spacing: 2px; width: 135px; height: 50px;background: transparent;border-color: floralwhite;border-style: solid;'>VALIDAR</button>\n" +
                    "      </a>\n" +
                    "    </div>\n" +
                    "  </div>\n" +
                    "</div>",true);
            this.mailSender.send(mime);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }
}
