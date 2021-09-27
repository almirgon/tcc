package com.example.promotion.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class OperationNotAllowedException extends RuntimeException {

    public OperationNotAllowedException (String s){
        super(s);
    }
}
