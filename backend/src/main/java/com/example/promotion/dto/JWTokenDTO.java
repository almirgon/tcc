package com.example.promotion.dto;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import java.io.Serializable;

public class JWTokenDTO implements Serializable {

    @NotNull
    @Column
    private String token;

    @NotNull
    @Column
    private UserDTO user;

    public JWTokenDTO() {

    }

    public JWTokenDTO(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUserDTO() {
        return user;
    }

    public void setUserDTO(UserDTO user) {
        this.user = user;
    }
}
