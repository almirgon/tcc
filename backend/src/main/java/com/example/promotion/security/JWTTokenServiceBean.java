package com.example.promotion.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JWTTokenServiceBean {


    public String getUserEmailFromJWTToken(String token) throws Exception {

        byte[] signingKey = SecurityConstants.JWT_SECRET.getBytes();

        Jws<Claims> parsedToken = Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token.replace("Bearer ", ""));

        String email = parsedToken
                .getBody()
                .getSubject();

        return email;
    }

}
