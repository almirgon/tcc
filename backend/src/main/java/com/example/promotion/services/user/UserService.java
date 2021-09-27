package com.example.promotion.services.user;

import com.example.promotion.dto.UserDTO;
import com.example.promotion.models.User;
import java.util.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;


public interface UserService {

    User getUserById(long id);
    User createUser(User user);
    User updateUser(String email, User user);
    User findUser(String email);
    void deleteUser(String email);
    List<User> findAll();



}
