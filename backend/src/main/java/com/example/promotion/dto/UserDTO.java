package com.example.promotion.dto;

import com.example.promotion.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDTO {

    private User user;

    public UserDTO(){
        this.user = new User();
    }

    public UserDTO(User user){
        this.user = user;
    }

    @JsonIgnore
    public User getUser(){
        return user;
    }

    public long getId(){
        return user.getId();
    }

    public String getEmail(){
        return user.getEmail();
    }

    public void setEmail(String email){
        user.setEmail(email);
    }

    public String getFirstName(){
        return user.getFirstName();
    }

    public void setFirstName(String firstName){
        user.setFirstName(firstName);
    }

    public String getLastName(){
        return user.getLastName();
    }

    public void setLastName(String lastName){
        user.setLastName(lastName);
    }

    public String getUrlPhoto(){
        return user.getUrlPhoto();
    }

    public void setUrlPhoto(String urlPhoto){
        user.setUrlPhoto(urlPhoto);
    }

    public String getRole(){return user.getRole();}


}
