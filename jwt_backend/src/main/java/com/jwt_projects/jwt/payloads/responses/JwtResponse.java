package com.jwt_projects.jwt.payloads.responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String jwt;
    private Long id;
    private String username;
    private String email;

    public JwtResponse(String jwt,Long id,String username,String email){
        this.jwt = jwt;
        this.id = id;
        this.username = username;
        this.email=email;
    }
    
}
