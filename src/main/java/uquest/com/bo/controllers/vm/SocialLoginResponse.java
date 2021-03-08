package uquest.com.bo.controllers.vm;

import uquest.com.bo.models.entity.Usuario;

public class SocialLoginResponse {
  private Usuario usuario;
  private JWTToken token;

  public Usuario getUsuario() {
    return usuario;
  }

  public void setUsuario(Usuario usuario) {
    this.usuario = usuario;
  }

  public JWTToken getToken() {
    return token;
  }

  public void setToken(JWTToken token) {
    this.token = token;
  }
}
