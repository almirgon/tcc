package com.example.promotion.models;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@Table(name = "promotion")
public class Promotion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @NotEmpty
    @Column
    private String name;

    @NotNull
    @Column
    private float price;

    @Column
    private String description;

    @Column(columnDefinition = "TEXT")
    private String photo;

    @NotNull
    @NotEmpty
    @Column(columnDefinition="TEXT")
    private String urlLink;

    @ManyToOne
    private User user;

    @Column
    private Status status;

    @Column
    private Date date;

    @ManyToMany()
    private List<User> likes;

    @OneToMany
    private List<Comment> comments;

    @Column
    private String voucher;

    @Column
    private Integer numberLikes;

    @Column
    private Integer numberComments;

    @Column
    private String soldBy;

    public Promotion() {
        this.likes = new ArrayList<>();
        this.comments = new ArrayList<>();
    }

    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSoldBy() {
        return soldBy;
    }

    public void setSoldBy(String soldBy) {
        this.soldBy = soldBy;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<User> getLikes() {
        return likes;
    }

    public void setLikes(List<User> likes) {
        this.likes = likes;
    }

    public int numLikes() {
        if (this.likes != null)
            return this.likes.size();
        return 0;
    }

    public int numComments(){
        if(this.comments != null){
            return this.comments.size();
        }
        return 0;
    }

    public String getVoucher() {
        return voucher;
    }

    public void setVoucher(String voucher) {
        this.voucher = voucher;
    }

    public Integer getNumberComments() {
        return numComments();
    }

    public void setNumberComments(Integer numberComments) {
        this.numberComments = numberComments;
    }

    public Integer getNumberLikes() {
        return numLikes();
    }

    public void setNumLikes(Integer numberLikes) {
        this.numberLikes = numberLikes;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUrlLink() {
        return urlLink;
    }

    public void setUrlLink(String urlLink) {
        this.urlLink = urlLink;
    }

    public List<Comment> getComments() {

        return comments.stream().filter(comment -> !comment.isCommentDeleted()).collect(Collectors.toList());
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public void addComment(Comment comment){
        this.comments.add(comment);
    }

    public void removeComment(Comment comment){
        this.comments.remove(comment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Promotion promotion = (Promotion) o;
        return id == promotion.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
