package uquest.com.bo.security;

import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IUsuarioDao;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final IUsuarioDao usuarioDao;

    public DomainUserDetailsService(IUsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);

        if (new EmailValidator().isValid(login, null)) {
            return usuarioDao.findByEmail(login)
                .map(user -> createSpringSecurityUser(login, user))
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
        }

        return usuarioDao.findByUsername(login)
            .map(user -> createSpringSecurityUser(login, user))
            .orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found in the database"));

    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, Usuario user) {
        if (!user.getEnabled()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }
        List<GrantedAuthority> grantedAuthorities = user.getRoles().stream()
            .map(authority -> new SimpleGrantedAuthority(authority.getNombre()))
            .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(lowercaseLogin,
            user.getPassword(),
            grantedAuthorities);
    }
}
