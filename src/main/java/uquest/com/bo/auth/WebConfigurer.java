package uquest.com.bo.auth;

import org.springframework.boot.web.server.WebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import java.util.Arrays;
import java.util.Collections;

@Configuration
public class WebConfigurer implements ServletContextInitializer, WebServerFactoryCustomizer<WebServerFactory> {
  @Override
  public void customize(WebServerFactory factory) {

  }

  @Override
  public void onStartup(ServletContext servletContext) throws ServletException {

  }


  @Bean
  public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
    config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
    config.setAllowCredentials(true);
    config.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**",config);
    return new CorsFilter(source);
  }
}
