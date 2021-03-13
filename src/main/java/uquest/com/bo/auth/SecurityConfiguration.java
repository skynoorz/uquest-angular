package uquest.com.bo.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import uquest.com.bo.security.AuthoritiesConstants;
import uquest.com.bo.security.jwt.JWTConfigurer;
import uquest.com.bo.security.jwt.TokenProvider;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final CustomAuthenticationProvider authenticationProvider;

    public SecurityConfiguration(
            TokenProvider tokenProvider,
            CorsFilter corsFilter,
            CustomAuthenticationProvider authenticationProvider
    ) {
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .antMatchers("/app/**/*.{js,html}")
                .antMatchers("/content/**")
                .antMatchers("/h2-console/**")
                .antMatchers("/swagger-ui/index.html");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        super.configure(auth);
        auth.authenticationProvider(authenticationProvider);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http.csrf()
                .disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
//                Login y respuestas
                .antMatchers("/api/google/login", "/api/login", "/api/respuesta/all").permitAll()
//                USUARIO sin registro
                .antMatchers(HttpMethod.GET,"/api/uploads/img/**",
                "/api/encuestas/available","/api/carreras",
                "/api/encuestas/carrera/**",
                "/images/no_user.png",
                "/api/encuestas/uid/**",
                "/api/respuestas/encuesta/**",
                "/api/respuesta/encuesta/results/export/**",
                "/api/usuarios/profile/**",
                "/api/usuarios/userexist/**",
                "/api/respuesta/usuarios/pregunta/public/**",
                "/api/carreras/institutos/**",
                "/api/usuarios/emailexist/**",
                "/api/usuarios/ciexist/**","/resources/**").permitAll()
//                GET control
                .antMatchers(HttpMethod.GET, "/api/usuarios/page/**").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.GET, "/api/usuarios/encuestas/user/**","/api/encuestas/finalizar/**").hasAuthority("ROLE_USER")
                .antMatchers(HttpMethod.GET, "/api/categorias","/api/encuestas").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .antMatchers(HttpMethod.GET, "/api/encuestas/**").permitAll()
//                POST, DELETE PUT control
                .antMatchers(HttpMethod.POST,"/api/usuarios").permitAll()
                .antMatchers(HttpMethod.POST,"/api/encuestas", "/api/usuarios/upload").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .antMatchers(HttpMethod.DELETE, "/api/encuestas/**").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .antMatchers(HttpMethod.PUT, "/api/usuarios/profile/**").hasAnyAuthority("ROLE_USER")
//                peticiones CRUD ADMIN
                .antMatchers( "/api/categorias/**","/api/encuestas/**","/api/carreras/**","/api/usuarios/**").hasAuthority("ROLE_ADMIN")
                .anyRequest().authenticated()
                .and()
                .apply(securityConfigurerAdapter());
        // @formatter:on
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
