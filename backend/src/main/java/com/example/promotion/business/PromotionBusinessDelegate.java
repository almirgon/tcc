package com.example.promotion.business;

import com.example.promotion.dto.PromotionDTO;
import com.example.promotion.models.Promotion;
import com.example.promotion.services.promotion.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionBusinessDelegate {

    @Autowired
    private PromotionService promotionService;

    public PromotionDTO findById(long id){
        return new PromotionDTO(this.promotionService.findById(id));
    }

    public PromotionDTO createPromotion(PromotionDTO promotionDTO){
        return new PromotionDTO(this.promotionService.createPromotion(promotionDTO.getPromotion()));
    }

    public PromotionDTO toLike(long id){
        return new PromotionDTO(this.promotionService.likes(id));
    }

    public List<PromotionDTO> findbySubstring(String promotion){
        return this.promotionService.findBySubstring(promotion).stream().map(promotions -> new PromotionDTO(promotions)).collect(Collectors.toList());
    }

    public PromotionDTO ApprovePromotion(long id, Promotion promotion){
        return new PromotionDTO(this.promotionService.ApprovePromotion(id,promotion));
    }

    public List<PromotionDTO> getActives(){
        return this.promotionService.getActive().stream().map(promotion -> new PromotionDTO(promotion)).collect(Collectors.toList());
    }

    public List<PromotionDTO> getPendings(){
        return this.promotionService.getPending().stream().map(promotion -> new PromotionDTO(promotion)).collect(Collectors.toList());
    }

    public List<PromotionDTO> getCloses(){
        return this.promotionService.getClosed().stream().map(promotion -> new PromotionDTO(promotion)).collect(Collectors.toList());
    }

    public PromotionDTO activatePromotion(long id){
        return new PromotionDTO(this.promotionService.activatePromotion(id));
    }

    public PromotionDTO closePromotion(long id){
        return new PromotionDTO(this.promotionService.closePromotion(id));
    }

    public PromotionDTO setStatus(long id){
        return new PromotionDTO(this.promotionService.setStatus(id));
    }

    public void delete(long id){
        this.promotionService.deletePromotion(id);
    }
}
