package uquest.com.bo.auth;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.services.UsuarioService;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  private final UsuarioService usuarioService;

  public CustomAuthenticationProvider(UsuarioService usuarioService) {
    this.usuarioService = usuarioService;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    Usuario user = usuarioService.loadUserByUsername(authentication.getName());
    if (user == null) {
        throw new
            BadCredentialsException("Not user found");
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
    return auth;
  }

  @Override
  public boolean supports(Class<?> aClass) {
    return aClass.equals(UsernamePasswordAuthenticationToken.class);
  }
}
