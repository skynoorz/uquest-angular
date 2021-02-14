package uquest.com.bo.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uquest.com.bo.models.MyUserPrincipal;
import uquest.com.bo.models.dao.IUsuarioDao;
import uquest.com.bo.models.entity.Usuario;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private IUsuarioDao usuarioDao;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Usuario user = usuarioDao.findByEmail(email);
        if (user == null) {
            user = usuarioDao.findByUsername(email);
            if (user == null) {
                throw new UsernameNotFoundException(email);
            }
        }
        return new MyUserPrincipal(user);
    }
}
