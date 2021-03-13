package uquest.com.bo.auth;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import uquest.com.bo.models.entity.Usuario;
import uquest.com.bo.models.services.UsuarioService;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

  private final UsuarioService usuarioService;
  private final PasswordEncoder passwordEncoder;

  public CustomAuthenticationProvider(UsuarioService usuarioService, PasswordEncoder passwordEncoder) {
    this.usuarioService = usuarioService;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    Usuario user = usuarioService.loadUserByUsername(authentication.getName());
    if (user == null) {
        throw new
            BadCredentialsException("Not user found");
    }

    if (authentication.getCredentials() == null) {
      throw new BadCredentialsException("No password set");
    }
    String presentedPassword = authentication.getCredentials().toString();
    if (!this.passwordEncoder.matches(presentedPassword, user.getPassword())) {
      throw new BadCredentialsException("Wrong password");
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
