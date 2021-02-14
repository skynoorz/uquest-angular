package uquest.com.bo.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import uquest.com.bo.models.entity.Usuario;

import java.util.Collection;

public class MyUserPrincipal implements UserDetails {
    private Usuario user;

    public MyUserPrincipal(Usuario user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
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
        return this.user.getEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.user.getEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.getEnabled();
    }
}
