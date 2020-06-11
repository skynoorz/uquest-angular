package uquest.com.bo.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.services.IUsuarioService;

import java.util.HashMap;
import java.util.Map;

@Component
public class InfoAdicionalToken implements TokenEnhancer {
    @Autowired
    private IUsuarioService usuarioService;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        Usuario usuario = usuarioService.findByUsername(authentication.getName());
        Map<String, Object> info = new HashMap<>();
//        info.put("info_adicional", "Hola que tal!: ".concat(authentication.getName()));
        info.put("nombres", usuario.getNombres());
        info.put("apellido_pat", usuario.getApellidoPat());
        info.put("apellido_mat", usuario.getApellidoMat());
        info.put("email", usuario.getEmail());
        info.put("sexo", usuario.getSexo());
//        info.put("roles",usuario.getRoles());
//        info.put("carrera", usuario.getCarrera());

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
        return accessToken;
    }
}
