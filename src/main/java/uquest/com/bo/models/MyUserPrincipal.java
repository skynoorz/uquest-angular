package uquest.com.bo.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import uquest.com.bo.models.entity.Usuario;

import java.util.Collection;
import java.util.stream.Collectors;

public class MyUserPrincipal implements UserDetails {
    private Usuario user;

    public MyUserPrincipal(Usuario user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream().map(role -> {
            return new SimpleGrantedAuthority(role.getNombre());
        }).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
//        para bloquear la cuenta si no esta validada
        return this.user.getEnabled();
//        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
//        para bloquear la cuenta si no esta validada
        return this.user.getEnabled();
//        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
//        para bloquear la cuenta si no esta validada
        return this.user.getEnabled();
//        return true;
    }
}
