package com.example.promotion.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private User user;

    @Column
    private String text;

    @Column
    private String date;

    @Column
    private boolean commentDeleted;

    @OneToMany
    private List<Comment> answers;

    public Comment() {
        this.answers = new ArrayList<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isCommentDeleted() {
        return commentDeleted;
    }

    public void setCommentDeleted(boolean commentDeleted) {
        this.commentDeleted = commentDeleted;
    }

    public List<Comment> getAnswers() {
        return answers.stream().filter(comment -> !comment.isCommentDeleted()).collect(Collectors.toList());
    }

    public void setAnswers(List<Comment> answers) {
        this.answers = answers;
    }

    public void addAnswer(Comment comment){
        this.answers.add(comment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return id == comment.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
