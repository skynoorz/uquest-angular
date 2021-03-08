package uquest.com.bo.models.services;

import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uquest.com.bo.models.dao.IUsuarioDao;
import uquest.com.bo.models.entity.Carrera;
import uquest.com.bo.models.entity.Instituto;
import uquest.com.bo.models.entity.Role;
import uquest.com.bo.models.entity.Usuario;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements IUsuarioService {

    private Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private IUsuarioDao usuarioDao;

    @Transactional
    public Usuario loadUserByUsername(final String login) {

        if (new EmailValidator().isValid(login, null)) {
            return usuarioDao.findByEmail(login)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));
        }

        return usuarioDao.findByUsername(login)
            .orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found in the database"));

    }







//    @Override
//    @Transactional(readOnly = true)
//    public Usuario findByUsername(String username) {
//        return usuarioDao.findByUsername(username);
//    }

    public Usuario findUserByToken(String token){
        return usuarioDao.findUsuarioByToken(token);
    }

    @Override
    public Usuario findByCi(String ci) {
        return this.usuarioDao.findByCi(ci);
    }

    @Override
    @Transactional
    public List<Usuario> findAll() {
        return (List<Usuario>) usuarioDao.findAll();
    }

    @Override
    @Transactional
    public Page<Usuario> findAll(Pageable pageable) {
        return usuarioDao.findAll(pageable);
    }

    @Override
    @Transactional
    public Usuario findById(Long id) {
        return usuarioDao.findById(id).orElse(null);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return usuarioDao.save(usuario);
    }

    @Override
    public void delete(Long id) {
        usuarioDao.deleteById(id);
    }

    @Transactional
    @Override
    public List<Carrera> findAllCarreras() {
        return usuarioDao.findAllCarreras();
    }

    @Override
    public List<Instituto> findAllInstitutos() {
        return usuarioDao.findAllInstitutos();
    }

    @Override
    public List<Role> findAllRoles() {
        return usuarioDao.findAllRoles();
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findByUsername(String name) {
        return usuarioDao.findByUsername(name).orElse(null);
    }

    @Override
    public Usuario findByEmail(String email) {
        return usuarioDao.findByEmail(email).orElse(null);
    }
}
