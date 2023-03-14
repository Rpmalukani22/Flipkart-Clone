package com.flipkart.clone.productmanagement.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Value("${webconf.sitecontent.allowed.origin}")
    String siteContentAllowedOrigin;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/site-content/**")
            .allowedOrigins(siteContentAllowedOrigin)
            .allowedMethods("GET")
            .maxAge(3600);
    }
}
