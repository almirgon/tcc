package com.example.promotion.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class IncorrectPasswordException extends AuthenticationException {
    public IncorrectPasswordException(String s){
        super(s);
    }
}
