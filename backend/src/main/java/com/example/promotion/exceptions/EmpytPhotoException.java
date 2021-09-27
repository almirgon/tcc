package com.example.promotion.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmpytPhotoException extends RuntimeException{
    public EmpytPhotoException(String s){super(s);}
}
