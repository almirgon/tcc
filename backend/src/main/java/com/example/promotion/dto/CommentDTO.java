package com.example.promotion.dto;

import com.example.promotion.models.Comment;
import com.example.promotion.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.stream.Collectors;

public class CommentDTO {

    private Comment comment;

    public CommentDTO() {
        this.comment = new Comment();
    }

    public CommentDTO(Comment comment) {
        this.comment = comment;
    }

    @JsonIgnore
    public Comment getComment(){
        return this.comment;
    }

    public long getId(){
        return this.comment.getId();
    }

    public void setId(long id){
        this.comment.setId(id);
    }

    public String getText() {
        return this.comment.getText();
    }

    public void setText(String text) {
        comment.setText(text);
    }

    public String getDate(){ return comment.getDate(); }

    public void setDate(String date){ this.comment.setDate(date);}

    public List<CommentDTO> getAnswers(){ return comment.getAnswers().stream().map(answer -> new CommentDTO(answer)).collect(Collectors.toList());}

    public void setAnswers(List<Comment> answers){ comment.setAnswers(answers);}

    public UserDTO getUser(){
        return new UserDTO(comment.getUser());
    }

    public void setUser(User user){ comment.setUser(user);}

    public void addAnswer(Comment comment){
        comment.addAnswer(comment);
    }
}
