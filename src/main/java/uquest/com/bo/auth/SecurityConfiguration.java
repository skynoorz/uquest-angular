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
        http
            .csrf()
            .disable()
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
            .authorizeRequests()
            .antMatchers("/**").permitAll()
            .antMatchers("/api/google/login").permitAll()
            .antMatchers(HttpMethod.GET,"/api/uploads/img/**", "/images/no_user.png", "/api/carreras", "/api/carreras/institutos/**", "/api/usuarios/encuestas/**", "/api/upr/**", "/api/usuarios/emailexist/**", "/api/categorias/**", "/api/encuestas/public/**", "/api/respuestas/encuesta/**", "/api/respuestas-total/encuesta/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/usuarios",  "/api/encuestas/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/encuestas/**","/api/respuesta/usuarios/pregunta/public/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/usuarios/userexist/**").permitAll()
            .antMatchers(HttpMethod.GET, "/").hasAnyRole("USER","ADMIN")
            //upload
            .antMatchers(HttpMethod.POST, "/api/usuarios/upload").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/usuarios/{id}").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios/upload").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")
//                .antMatchers("/api/usuarios/page/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.GET,"/api/usuarios/profile/**").hasRole("USER")
            .antMatchers(HttpMethod.PUT,"/api/usuarios/profile/**").hasRole("USER")
            .antMatchers("/api/usuarios/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET,  "/api/usuarios/encuestas/**").hasRole("USER")
            .anyRequest().authenticated()
        .and()
            .apply(securityConfigurerAdapter());
        // @formatter:on
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }
}
