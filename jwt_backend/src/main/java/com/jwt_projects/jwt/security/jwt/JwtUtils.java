package com.jwt_projects.jwt.security.jwt;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@SuppressWarnings("deprecation")
@Component
public class JwtUtils {
    //To create a logger of the actions
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class) ;

    @Value("${ijseapp.jwt.secret}")
    private String jwtSecret;

    @Value("${ijseapp.jwt.expiration}")
    private int jwtExpirationMs;


    public String generateJwtToken(Authentication authentication){
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal(); //Get the returned user details from the object

        return Jwts.builder()
        .setSubject(userPrincipal.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(new Date().getTime()+jwtExpirationMs))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
    }


    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().setSigningKey(key()).build().parse(authToken);
            return true;
        }catch(MalformedJwtException e){
            logger.error("Invalid JWT Token : {}", e.getMessage());
        }catch(ExpiredJwtException e){
            logger.error("JWT Token expired : {}", e.getMessage());
        }catch(UnsupportedJwtException e){
            logger.error("Unsupported JWT : {}", e.getMessage());
        }catch(IllegalArgumentException e){
            logger.error("JWT payload is empty : {}", e.getMessage());
        }
            return false;
    }

    public String getUsernameFromJwtToken(String authToken){
        return Jwts.parser().setSigningKey(key()).build().parseClaimsJws(authToken).getBody().getSubject();
    }



    
}
