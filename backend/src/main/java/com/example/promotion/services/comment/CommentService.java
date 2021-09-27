package com.example.promotion.services.comment;

import com.example.promotion.models.Comment;

import java.util.List;

public interface CommentService {

    Comment findById(long id);
    List<Comment> findAll();
    Comment createComment(long idPromotion, Comment comment);
    Comment ReplyComment(long id, Comment comment);
    Comment deleteComment(long id);
}
