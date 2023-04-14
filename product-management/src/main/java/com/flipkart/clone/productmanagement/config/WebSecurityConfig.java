package com.flipkart.clone.productmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.stereotype.Component;

// import java.util.Collection;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.core.convert.converter.Converter;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.oauth2.jwt.JwtClaimNames;
// import org.springframework.security.web.SecurityFilterChain;

// import com.c4_soft.springaddons.security.oauth2.OAuthentication;
// import com.c4_soft.springaddons.security.oauth2.OpenidClaimSet;
// import com.c4_soft.springaddons.security.oauth2.config.SpringAddonsSecurityProperties;
// import com.c4_soft.springaddons.security.oauth2.config.synchronised.OAuth2AuthenticationFactory;
// import com.c4_soft.springaddons.security.oauth2.config.synchronised.ResourceServerExpressionInterceptUrlRegistryPostProcessor;
// import com.flipkart.clone.productmanagement.component.JwtAuthConverter;

// import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor
// @Configuration
// @EnableMethodSecurity
// public class WebSecurityConfig {

//     // @Autowired
//     // private final JwtAuthConverter jwtAuthConverter;

//     // @Bean
//     // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
//     // Exception {
//     // http.csrf().disable()
//     // .authorizeHttpRequests()
//     // .anyRequest().authenticated();
//     // http.oauth2ResourceServer()
//     // .jwt()
//     // .jwtAuthenticationConverter(jwtAuthConverter);
//     // http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//     // return http.build();
//     // }

//     @Bean
//     OAuth2AuthenticationFactory authenticationFactory(
//             Converter<Map<String, Object>, Collection<? extends GrantedAuthority>> authoritiesConverter,
//             SpringAddonsSecurityProperties addonsProperties) {
//         return (bearerString, claims) -> new OAuthentication<>(new OpenidClaimSet(
//                 claims,
//                 addonsProperties.getIssuerProperties(claims.get(JwtClaimNames.ISS))
//                         .getUsernameClaim()),
//                 authoritiesConverter.convert(claims), bearerString);
//     }

//     @Bean
//     public ResourceServerExpressionInterceptUrlRegistryPostProcessor expressionInterceptUrlRegistryPostProcessor() {
//         // @formatter:off
//         return (AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) -> registry
//                 .requestMatchers("/api/product-management/products").hasRole("USER")
//                 .anyRequest().authenticated();
//         // @formatter:on
//     }

// }

@EnableMethodSecurity
@EnableWebSecurity
@Component
public class WebSecurityConfig  {


    @Bean
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new NullAuthenticatedSessionStrategy();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        grantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.
                csrf().disable().
                authorizeHttpRequests()
                .requestMatchers("/api/product-management/**").authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2ResourceServer()
                .jwt();
        return http.build();
    }


}