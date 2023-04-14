package com.flipkart.clone.productmanagement.component;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import com.flipkart.clone.productmanagement.property.JwtAuthConverterProperties;

// @Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Autowired
    private JwtAuthConverterProperties properties;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        // Collection<GrantedAuthority> authorities = (new JwtGrantedAuthoritiesConverter()).convert(jwt);
        // if(authorities!=null){
        //    authorities =  Stream.concat(authorities.stream(),extractResourceRoles(jwt).stream()).collect(Collectors.toSet());
        // }
        // else{
        //     authorities =  extractResourceRoles(jwt).stream().collect(Collectors.toSet());
        // }
        // return new JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt));
        return new JwtAuthenticationToken(jwt);
    }
    private String getPrincipalClaimName(Jwt jwt) {
        String claimName = JwtClaimNames.SUB;
        if (properties.getPrincipalAttribute() != null) {
            claimName = properties.getPrincipalAttribute();
        }
        return jwt.getClaim(claimName);
    }

    @SuppressWarnings("unchecked")
    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        Map<String, Object> resource;
        Collection<String> resourceRoles;
        if (resourceAccess == null
                || (resource = (Map<String, Object>) resourceAccess.get(properties.getResourceId())) == null
                || (resourceRoles = (Collection<String>) resource.get("roles")) == null) {
            return Set.of();
        }
        return resourceRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }


}
