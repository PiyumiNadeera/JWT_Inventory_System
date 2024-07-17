package com.jwt_projects.jwt.service;

import org.springframework.stereotype.Service;

import com.jwt_projects.jwt.dto.UserProfileDTO;
import com.jwt_projects.jwt.entity.User;

@Service
public interface UserService {
    User updateUser(Long id, UserProfileDTO userProfileDTO);
    User getUserById(Long id);
    
}
