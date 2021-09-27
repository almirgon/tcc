package com.example.promotion.exceptions.promotion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PromotionNullException extends RuntimeException {
    public PromotionNullException(String s){
        super(s);
    }
}
