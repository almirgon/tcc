package com.example.promotion.dto;


import com.example.promotion.models.User;
import com.sun.istack.NotNull;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.MappedSuperclass;


@MappedSuperclass
public class TokenDTO implements Serializable {

    @NotNull
    @Column
    private String token;

    @NotNull
    @Column
    public User user;

    public TokenDTO(){}

    public TokenDTO(String token, User user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


}

