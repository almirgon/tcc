package com.example.promotion.models;

public enum Status {
    ATIVA("ATIVA"),
    ENCERRADA("ENCERRADA"),
    PENDENTE("PENDENTE");

    private String description;

    Status(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }





}
