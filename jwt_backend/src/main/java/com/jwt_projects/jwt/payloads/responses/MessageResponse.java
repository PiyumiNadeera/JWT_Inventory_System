package com.jwt_projects.jwt.payloads.responses;

import lombok.Data;

@Data
public class MessageResponse {
    private String message;

    public MessageResponse(String message){
        this.message = message;
    }
    
}
