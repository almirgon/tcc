package com.example.promotion.validators;

import com.example.promotion.exceptions.user.UserInvalidException;
import com.example.promotion.exceptions.user.UserNullException;
import com.example.promotion.models.User;
import org.springframework.stereotype.Component;


@Component
public class UserValidator {

    public void ValidUser(User user){
        if (user.getFirstName().trim().isEmpty()) throw new UserInvalidException("O primeiro nome não pode ser vazio");
        if (user.getFirstName() == null) throw new UserNullException("O primeiro nome não pode ser nulo");
        if(user.getLastName().trim().isEmpty()) throw new UserInvalidException("O sobrenome não pode ser vazio");
        if(user.getLastName() == null) throw new UserNullException("O sobrenome não pode ser nulo");
        if(user.getEmail().trim().isEmpty()) throw new UserInvalidException("O email não pode ser nulo");
        if(user.getEmail() == null) throw new UserNullException("O email não pode ser nulo");
        if(user.getPassword().trim().isEmpty()) throw new UserInvalidException("A senha não pode ser vazia");
        if(user.getPassword() == null) throw new UserNullException("A senha não pode ser nula");

    }


}
