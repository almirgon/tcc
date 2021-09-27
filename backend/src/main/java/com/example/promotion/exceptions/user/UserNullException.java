package com.example.promotion.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNullException extends AuthenticationException {
    public UserNullException(String s){
        super(s);
    }
}
