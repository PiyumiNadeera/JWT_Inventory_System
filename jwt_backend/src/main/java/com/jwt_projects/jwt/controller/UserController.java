package com.jwt_projects.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


import org.springframework.web.bind.annotation.RestController;

import com.jwt_projects.jwt.dto.UserProfileDTO;
import com.jwt_projects.jwt.entity.User;
import com.jwt_projects.jwt.service.UserService;



@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/users/{id}/profile")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @ModelAttribute UserProfileDTO userProfileDTO){
        return new ResponseEntity<User>(userService.updateUser(id,userProfileDTO),HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return new ResponseEntity<User>(userService.getUserById(id),HttpStatus.OK);
    }
    
}
