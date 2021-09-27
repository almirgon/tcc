package com.example.promotion.services.user;


import com.example.promotion.exceptions.EntityNotExistsException;
import com.example.promotion.models.User;
import com.example.promotion.repositories.UserRepository;
import com.example.promotion.validators.UserValidator;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserBean implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User getUserById(long id) {
        return this.userRepository.findUserById(id);
    }

    @Override
    public User createUser(User user) {
        userValidator.ValidUser(user);
        user.setPassword(encoder.encode(user.getPassword()));
        user.addRole("CLIENT");
        return this.userRepository.save(user);

    }


    @Override
    public User updateUser(String email, User user) {
        User existingUser = this.userRepository.findUserByEmail(email);
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        return this.userRepository.save(existingUser);
    }

    @Override
    public User findUser(String email) {
        return this.userRepository.findUserByEmail(email);

    }

    @Override
    public void deleteUser(String email) {
        User user = this.userRepository.findUserByEmail(email);
        if(user != null){
            this.userRepository.delete(user);
        }
        throw new EntityNotExistsException("Usuário não existe");
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }



}
