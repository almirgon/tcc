package com.example.promotion.validators;

import com.example.promotion.exceptions.promotion.PromotionInvalidException;
import com.example.promotion.exceptions.promotion.PromotionNullException;
import com.example.promotion.models.Promotion;
import org.springframework.stereotype.Component;

@Component
public class PromotionValidator {

    public void ValidPromotion(Promotion promotion){
        if(promotion.getName().trim().isEmpty()) throw new PromotionInvalidException("O nome não pode ser vazio");
        if(promotion.getName() == null) throw new PromotionNullException("O nome não pode ser nulo");
        if(promotion.getPrice() <= 0) throw new PromotionInvalidException("O preço não pode ser menor que 0");



    }
}
