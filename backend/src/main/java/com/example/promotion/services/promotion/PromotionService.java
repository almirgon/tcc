package com.example.promotion.services.promotion;

import com.example.promotion.models.Promotion;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;


public interface PromotionService {

    Promotion createPromotion(Promotion promotion);
    Promotion setStatus(long id);
    public Promotion ApprovePromotion(long id, Promotion promotion);
    Promotion updatePromotion(Promotion promotion);
    Promotion findById(long id);
    List<Promotion> findBySubstring(String promotion);
    void deletePromotion(long id);
    Promotion likes(long id);
    Promotion closePromotion(long id);
    List<Promotion> getActive();
    List<Promotion> getPending();
    List<Promotion> getClosed();
    Promotion activatePromotion(long id);


}
