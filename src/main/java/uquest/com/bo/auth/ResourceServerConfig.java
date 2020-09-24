package uquest.com.bo.auth;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers(HttpMethod.GET,"/api/uploads/img/**", "/images/no_user.png", "/api/carreras", "/api/carreras/institutos/**", "/api/usuarios/encuestas/**", "/api/upr/**", "/api/usuarios/emailexist/**", "/api/categorias/**", "/api/encuestas/public/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/usuarios",  "/api/encuestas/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/usuarios/userexist/**").permitAll()
                .antMatchers(HttpMethod.GET, "/").hasAnyRole("USER","ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/usuarios/{id}").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios/upload").hasRole("ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")
//                .antMatchers("/api/usuarios/page/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET,"/api/usuarios/profile/**").hasRole("USER")
                .antMatchers("/api/usuarios/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET,  "/api/usuarios/encuestas/**").hasRole("USER")
                .anyRequest().authenticated()
                .and().cors().configurationSource(corsConfigurationSource());
    }
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//        http.authorizeRequests().antMatchers(HttpMethod.GET,"/api/usuarios", "/api/usuarios/page/**",  "/api/uploads/img/**", "/images/no_user.png").permitAll()
//                .antMatchers(HttpMethod.GET, "/api/usuarios/{id}").hasAnyRole("USER","ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios/{id}").hasAnyRole("USER")
//                .antMatchers(HttpMethod.POST, "/api/usuarios/upload").hasAnyRole("USER","ADMIN")
//                .antMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")
//                .antMatchers("/api/usuarios/**").hasRole("ADMIN")
//                .anyRequest().authenticated()
//                .and().cors().configurationSource(corsConfigurationSource());
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",config);
        return source;
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter(){
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}
