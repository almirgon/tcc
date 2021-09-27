package com.example.promotion.exceptions.promotion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PromotionInvalidException extends RuntimeException {
    public PromotionInvalidException(String s){
        super(s);
    }
}
