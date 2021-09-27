package com.example.promotion.exceptions.comment;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CommentDeleteException extends RuntimeException {
    public CommentDeleteException(String msg){
        super(msg);
    }
}
