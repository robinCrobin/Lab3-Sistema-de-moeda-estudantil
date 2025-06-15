package com.example.Lab3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class Lab3Application {

    /*
   // cd code
    * mvn clean package
   // mvn spring-boot:run
     */
    public static void main(String[] args) {
        // Carrega variáveis do .env
        Dotenv dotenv = Dotenv.configure().load();

        // Configura a variável de ambiente para o Spring
        System.setProperty("SENDGRID_API_KEY", dotenv.get("SENDGRID_API_KEY"));

        SpringApplication.run(Lab3Application.class, args);
    }
}

/*
 * Aluno: marcosctaveira@gmail.com
 * Professor: marcosbhtaveira@gmail.com
 * Empresa: marcos.taveira@sga.pucminas.br
 * Senhas: 1234
 */
