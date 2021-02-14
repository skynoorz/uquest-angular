package uquest.com.bo.models.services.listeners;

import org.springframework.context.ApplicationEvent;
import uquest.com.bo.models.entity.Usuario;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    private String appUrl;
    private Usuario user;

    public OnRegistrationCompleteEvent(
            Usuario user, String appUrl) {
        super(user);
        this.user = user;
        this.appUrl = appUrl;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

}
