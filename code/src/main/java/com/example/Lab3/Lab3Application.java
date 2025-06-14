package com.example.Lab3;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Lab3Application {

    public static void main(String[] args) {
        // Carrega variáveis do .env
        Dotenv dotenv = Dotenv.configure().load();
        
        // Configura a variável de ambiente para o Spring
        System.setProperty("SENDGRID_API_KEY", dotenv.get("SENDGRID_API_KEY"));
        
        SpringApplication.run(Lab3Application.class, args);
    }
}