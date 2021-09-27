package com.example.promotion.validators;

import com.example.promotion.exceptions.comment.CommentInvalidException;
import com.example.promotion.exceptions.comment.CommentNullException;
import com.example.promotion.models.Comment;

public class CommentValidator {

    public static void ValidComment(Comment comment){
        if(comment.getText() == null) throw new CommentNullException("O texto do comentário não pode ser nulo");
        if(comment.getText().trim().equals("")) throw new CommentInvalidException("O texto do comentário não pode ser vazio");
        if(comment.getUser() == null) throw new CommentNullException("O comentário precisa ter um usuário associado");
    }
}
