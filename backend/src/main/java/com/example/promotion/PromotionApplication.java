package com.example.promotion;

import com.example.promotion.models.User;
import com.example.promotion.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableAutoConfiguration
public class PromotionApplication {


	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(PromotionApplication.class, args);
	}

	@Bean
	InitializingBean sendDatabase() {
		return () -> {

			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String firstName = "admin";
			String lastName = "admin";
			String email = "admin@admin.com";
			String password = passwordEncoder.encode("4G2wR%u96yYzhmGs");
			String role = "ADMIN";

			User u = new User(firstName,  lastName, email, password);
			u.addRole(role);
			userRepository.save(u);

		};
	}

}




