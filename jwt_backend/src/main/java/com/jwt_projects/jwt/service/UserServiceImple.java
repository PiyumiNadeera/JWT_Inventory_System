package com.jwt_projects.jwt.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jwt_projects.jwt.dto.UserProfileDTO;
import com.jwt_projects.jwt.entity.User;
import com.jwt_projects.jwt.repository.UserRepository;

@Service
public class UserServiceImple implements UserService {

    @Autowired
    UserRepository userRepository;

    @Value("${upload.directory}")
    private String uploadDirectory;

    @Override
    public User updateUser(Long id,UserProfileDTO userProfileDTO){
        User exisitingUser = userRepository.findById(id).orElse(null);

        if(exisitingUser != null){

            MultipartFile file = userProfileDTO.getProfileImage();
            String fileName = file.getOriginalFilename();
            String filePath = uploadDirectory + File.separator + fileName;

            try {
                file.transferTo(new File(filePath));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }

            exisitingUser.setProfileImage(fileName);

            return userRepository.save(exisitingUser);
        }
        return null;
    }

    @Override
    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    
    
}
