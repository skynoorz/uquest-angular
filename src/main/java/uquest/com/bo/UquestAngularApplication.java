package uquest.com.bo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class UquestAngularApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(UquestAngularApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		for (int i = 0; i < 4; i++) {
			System.out.println(UUID.randomUUID().toString());
		}
	}
}
