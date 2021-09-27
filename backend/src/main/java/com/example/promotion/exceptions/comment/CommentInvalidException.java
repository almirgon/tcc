package com.example.promotion.exceptions.comment;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CommentInvalidException extends RuntimeException {
    public CommentInvalidException(String msg){
        super(msg);
    }
}
