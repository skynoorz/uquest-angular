package uquest.com.bo.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uquest.com.bo.controllers.vm.GoogleLoginVM;
import uquest.com.bo.controllers.vm.JWTToken;
import uquest.com.bo.controllers.vm.LoginVM;
import uquest.com.bo.controllers.vm.SocialLoginResponse;
import uquest.com.bo.models.services.AuthService;
import uquest.com.bo.security.jwt.JWTFilter;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthRestController {

  private final AuthenticationManagerBuilder authenticationManagerBuilder;

  private final AuthService authService;


  public AuthRestController(AuthenticationManagerBuilder authenticationManagerBuilder, AuthService authService) {
    this.authenticationManagerBuilder = authenticationManagerBuilder;
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {

    UsernamePasswordAuthenticationToken authenticationToken =
        new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    JWTToken jwtToken = authService.authenticate(authentication);
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwtToken.getIdToken());
    return new ResponseEntity<>(jwtToken, httpHeaders, HttpStatus.OK);
  }

  @PostMapping("/google/login")
  public ResponseEntity<SocialLoginResponse> login(@RequestBody GoogleLoginVM payload) {
    SocialLoginResponse resp = authService.login(payload.getCode());
    return ResponseEntity.ok(resp);
  }
}
