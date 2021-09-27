package com.example.promotion.dto;

import com.example.promotion.models.Comment;
import com.example.promotion.models.Promotion;
import com.example.promotion.models.Status;
import com.example.promotion.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class PromotionDTO {

    private Promotion promotion;

    public PromotionDTO(){
        this.promotion = new Promotion();
    }

    public PromotionDTO(Promotion promotion){
        this.promotion = promotion;
    }

    @JsonIgnore
    public Promotion getPromotion(){
        return promotion;
    }

    public long getId(){
        return promotion.getId();
    }

    public String getName(){
        return promotion.getName();
    }

    public void setName(String name){
        promotion.setName(name);
    }

    public Date getDate(){
        return promotion.getDate();
    }

    public void setDate(Date date){
        promotion.setDate(date);
    }

    public float getPrice(){
       return promotion.getPrice();
    }

    public void setPrice(float price){
        this.promotion.setPrice(price);
    }

    public List<CommentDTO> getComments(){
        return promotion.getComments().stream().map(comment -> new CommentDTO(comment)).collect(Collectors.toList());
    }

    public void setComments(List<Comment> comments){
        promotion.setComments(comments);
    }

    public UserDTO getUser(){
        return new UserDTO(promotion.getUser());
    }

    public void setUser(User user){
        this.promotion.setUser(user);
    }

    public String getDescription(){
        return promotion.getDescription();
    }

    public void setDescription(String description){
        promotion.setDescription(description);
    }

    public String getVoucher(){
        return promotion.getVoucher();
    }

    public void setVoucher(String voucher){
        promotion.setVoucher(voucher);
    }

    public int getNumberLikes(){return promotion.numLikes();}

    public int getNumberComments(){return promotion.getNumberComments();}

    public Status getStatus(){ return promotion.getStatus();}

    public String getUrlLink(){
        return promotion.getUrlLink();
    }

    public void setUrlLink(String urlLink){
        this.promotion.setUrlLink(urlLink);
    }

    public String getSoldBy(){return promotion.getSoldBy();}

    public void setSoldBy(String soldBy){this.promotion.setSoldBy(soldBy);}

    public String getPhoto(){return promotion.getPhoto();}

    public void setPhoto(String photo){this.promotion.setPhoto(photo);}
}





