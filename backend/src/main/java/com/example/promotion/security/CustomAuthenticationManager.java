package com.example.promotion.security;

import com.example.promotion.exceptions.IncorrectPasswordException;
import com.example.promotion.exceptions.user.UserNullException;
import com.example.promotion.models.User;
import com.example.promotion.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthenticationManager implements AuthenticationManager {

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userService.findUser(email);
        if (user == null)
            throw new UserNullException("Usuário não encontrado");

        boolean matchPassword = passwordEncoder.matches(password, user.getPassword());

        if (matchPassword){
            return new UsernamePasswordAuthenticationToken(email, password);
        }
        else{
            throw new IncorrectPasswordException("Email ou senha incorretos");
        }
    }
}
