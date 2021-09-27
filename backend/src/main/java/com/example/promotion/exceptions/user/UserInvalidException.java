package com.example.promotion.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserInvalidException extends RuntimeException{
    public UserInvalidException(String s){
        super(s);
    }
}
