package com.hcld2.jwtdemo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Demo API",
                version = "Version 1.0",
                contact = @Contact(
                        name = "Sarthak",
                        email = "sarthakt0128.com",
                        url = "https://hcl-training.com"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.apache.org/licenses/LICENSE-2.0"
                ),
                termsOfService = "https://hcl.com/TOS",
                description = "Spring Boot RESTful API Demo by Sarthak"
        ),
        // applies the JWT scheme to every endpoint, so Swagger sends the token
        security = @SecurityRequirement(name = "jwt-demo-api")
)
@SecurityScheme(
        name = "jwt-demo-api",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        in = SecuritySchemeIn.HEADER,
        bearerFormat = "JWT"
)
public class OpenApiConfig {
}
