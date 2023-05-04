package com.flipkart.clone.productmanagement.config;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.stereotype.Component;

import com.flipkart.clone.productmanagement.commons.utility.KeycloakJwtAuthenticationConverter;

import lombok.extern.slf4j.Slf4j;

@Component
@EnableWebSecurity
@EnableMethodSecurity
@Slf4j
public class WebSecurityConfig {

    @Bean
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new NullAuthenticatedSessionStrategy();
    }

    // @Bean
    // public JwtAuthenticationConverter jwtAuthenticationConverter() {
    // // JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new
    // JwtGrantedAuthoritiesConverter();
    // // grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
    // // grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
    // // JwtAuthenticationConverter jwtAuthenticationConverter = new
    // JwtAuthenticationConverter();
    // //
    // jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    // // return jwtAuthenticationConverter;
    // JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new
    // JwtGrantedAuthoritiesConverter() {
    // @Override
    // public Collection<GrantedAuthority> convert(Jwt jwt) {
    // Collection<String> roles = jwt.getClaimAsStringList("realm_access.roles");
    // log.debug("Roles extracted from JWT token: {}", roles);
    // return roles.stream()
    // .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
    // .collect(Collectors.toList());
    // }
    // };
    // JwtAuthenticationConverter jwtAuthenticationConverter = new
    // JwtAuthenticationConverter();
    // jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    // return jwtAuthenticationConverter;
    // }

    // @Bean
    // public JwtAuthenticationConverter jwtAuthenticationConverter() {
    // JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new
    // JwtGrantedAuthoritiesConverter();
    // grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
    // grantedAuthoritiesConverter.setAuthoritiesClaimName("realm_access.roles");
    // JwtAuthenticationConverter jwtAuthenticationConverter = new
    // JwtAuthenticationConverter();
    // jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
    // return jwtAuthenticationConverter;
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf().disable().authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                .requestMatchers("/search").permitAll()
                .requestMatchers(HttpMethod.POST, "/create-payment-intent").authenticated()
                .requestMatchers(HttpMethod.POST, "/webhook").authenticated()
                .requestMatchers(HttpMethod.POST).hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST).hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT).hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2ResourceServer()
                .jwt()
                .jwtAuthenticationConverter(new KeycloakJwtAuthenticationConverter());
        return http.build();
    }

}
