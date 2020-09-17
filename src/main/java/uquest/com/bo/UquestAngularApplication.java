package uquest.com.bo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class UquestAngularApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UquestAngularApplication.class, args);
	}

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
//		String password = "gaal";
//		for (int i = 0; i < 4; i++) {
//			String passwordBcrypt = passwordEncoder.encode(password);
//			System.out.println(passwordBcrypt);
//		}

	}
}
