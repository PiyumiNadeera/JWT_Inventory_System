package com.jwt_projects.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwt_projects.jwt.entity.User;
import com.jwt_projects.jwt.payloads.requests.LoginRequests;
import com.jwt_projects.jwt.payloads.responses.JwtResponse;
import com.jwt_projects.jwt.payloads.responses.MessageResponse;
import com.jwt_projects.jwt.repository.UserRepository;
import com.jwt_projects.jwt.security.jwt.JwtUtils;


@CrossOrigin(origins="*")
@RestController
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

   @Autowired
   AuthenticationManager authenticationManager;
    

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){

        if(userRepository.existsByUsername(user.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username already exists"));
        }

        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Email already used"));
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(newUser);

        return ResponseEntity.ok(new MessageResponse("User registered successfully"));


    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequests requests){

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(requests.getUsername(), requests.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        User user = userRepository.findByUsername(requests.getUsername()).orElse(null);

        return ResponseEntity.ok(new JwtResponse(jwt,user.getId(),user.getUsername(),user.getEmail()));
    }

    
}
