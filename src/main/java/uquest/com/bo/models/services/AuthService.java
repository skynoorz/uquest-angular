package uquest.com.bo.models.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import uquest.com.bo.controllers.vm.JWTToken;
import uquest.com.bo.controllers.vm.SocialLoginResponse;
import uquest.com.bo.models.dao.IUsuarioDao;
import uquest.com.bo.models.entity.Role;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.security.jwt.TokenProvider;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {
  @Value("${google.oauth2.client.secret}")
  private String clientSecret;
  @Value("${google.oauth2.client.id}")
  private String clientId;
  @Value("${server.url}")
  private String serverUrl;

  private final IUsuarioDao usuarioDao;
  private final TokenProvider tokenProvider;


  public AuthService(IUsuarioDao usuarioDao, TokenProvider tokenProvider) {
    this.usuarioDao = usuarioDao;
    this.tokenProvider = tokenProvider;
  }


  public JWTToken authenticate(Authentication authentication) {
    //    TODO validar aca con usuarioDao?? no entender haha
    String token = tokenProvider.createToken(authentication, false);
    return new JWTToken(token);
  }

  public SocialLoginResponse login(String authCode) {
    SocialLoginResponse response = new SocialLoginResponse();
    try {
      GoogleTokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
          new NetHttpTransport(),
          JacksonFactory.getDefaultInstance(),
          "https://oauth2.googleapis.com/token",
          clientId,
          clientSecret,
          authCode,
          "postmessage")
          .execute();
      GoogleIdToken idToken = tokenResponse.parseIdToken();
      GoogleIdToken.Payload payload = idToken.getPayload();

      // check if user already exists
      String userId = payload.getSubject();
      Usuario user = usuarioDao.findOneBySocialId(userId).orElseGet(() -> {
        // if user doesn't exist then create a new one without password
        String email = payload.getEmail();
        String name = (String) payload.get("given_name");
        String familyName = (String) payload.get("family_name");
        String foto = (String) payload.get("picture");
        Usuario usuario = new Usuario();
        usuario.setSocialId(userId);
        usuario.setEnabled(true);
        usuario.setEmail(email);
        usuario.setNombres(name);
        usuario.setFoto(foto);
        usuario.setApellidoPat(familyName);
        Role role = new Role();
        role.setId(1L);
        usuario.setRoles(Lists.newArrayList(role));
        return usuario;
      });

      if (user.getId() == null) {
        // complete registration on FE
        response.setUsuario(user);
        return response;
      }

      List<GrantedAuthority> grantedAuthorities = user.getRoles().stream()
          .map(authority -> new SimpleGrantedAuthority(authority.getNombre()))
          .collect(Collectors.toList());

      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
          user.getUsername(),
          user.getPassword(),
          grantedAuthorities
      );
      auth.setDetails(user);

      response.setToken(authenticate(auth));
      return response;
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException("Error trying to login in with google");
    }
  }
}
