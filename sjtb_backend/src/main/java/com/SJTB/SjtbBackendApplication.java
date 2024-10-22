package com.SJTB;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SjtbBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(SjtbBackendApplication.class, args);
	}
}
