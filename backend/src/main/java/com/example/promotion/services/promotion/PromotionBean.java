package com.example.promotion.services.promotion;

import com.example.promotion.dto.UserDTO;
import com.example.promotion.exceptions.EmpytPhotoException;
import com.example.promotion.exceptions.OperationNotAllowedException;
import com.example.promotion.exceptions.promotion.PromotionInvalidException;
import com.example.promotion.models.Promotion;
import com.example.promotion.models.Status;
import com.example.promotion.models.User;
import com.example.promotion.repositories.PromotionRepository;
import com.example.promotion.validators.PromotionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class PromotionBean implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionValidator promotionValidator;

    @Override
    public Promotion createPromotion(Promotion promotion) {
        promotionValidator.ValidPromotion(promotion);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        promotion.setUser(user);
        Date data = new Date();
        promotion.setDate(data);
        promotion.setStatus(Status.PENDENTE);
        return this.promotionRepository.save(promotion);
    }

    @Override
    public Promotion setStatus(long id) {
        Promotion myPromotion = promotionRepository.findById(id);
        if(myPromotion.getStatus().equals(Status.ATIVA)){
            myPromotion.setStatus(Status.ENCERRADA);
        }else{
            myPromotion.setStatus(Status.ATIVA);
        }
        return this.promotionRepository.save(myPromotion);

    }

    @Override
    public Promotion ApprovePromotion(long id, Promotion promotion) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!user.getRole().equals("ADMIN"))
            throw new OperationNotAllowedException("Usuário não permitido");
        Promotion myPromotion = promotionRepository.findById(id);
        myPromotion.setSoldBy(promotion.getSoldBy());
        myPromotion.setPhoto(promotion.getPhoto());
        myPromotion.setStatus(Status.ATIVA);
        return this.promotionRepository.save(myPromotion);
    }

    @Override
    public Promotion updatePromotion(Promotion promotion) {
        return this.promotionRepository.save(promotion);
    }

    @Override
    public Promotion findById(long id) {
        Promotion promotion = promotionRepository.findById(id);
        if(promotion == null){
            throw new PromotionInvalidException("Essa promoção não existe, por favor tente novamente");
        }else{
            return promotion;
        }
    }


    @Override
    public List<Promotion> findBySubstring(String promotion) {
        return this.promotionRepository.findBySubstring(promotion);
    }

    @Override
    public void deletePromotion(long id) {
        Promotion promotion = promotionRepository.findById(id);
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(promotion == null){
            throw new PromotionInvalidException("Essa promoção não existe");
        }else if(!userContext.getRole().equals("ADMIN")){
            throw new OperationNotAllowedException("Usuário não permitido");
        }else{
            this.promotionRepository.deleteById(id);
        }
    }

    @Override
    public Promotion likes(long id) {
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Promotion promotion = this.findById(id);
        if (!promotion.getLikes().contains(userContext)){
            promotion.getLikes().add(userContext);
        } else {
            promotion.getLikes().remove(userContext);
        }
        promotion.setNumLikes(promotion.getLikes().size());
        return this.promotionRepository.save(promotion);
    }

    @Override
    public Promotion closePromotion(long id) {
        Promotion promotion = promotionRepository.findById(id);
        User userContext = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(promotion.getUser().getEmail().equals(userContext.getEmail())){
            promotion.setStatus(Status.ENCERRADA);
        }else{
            throw new OperationNotAllowedException("Usuário não permitido");
        }
        return this.promotionRepository.save(promotion);
    }


    @Override
    public List<Promotion> getActive() {
        return this.promotionRepository.getAllByStatus(Status.ATIVA);
    }

    @Override
    public List<Promotion> getPending() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(user.getRole().equals("ADMIN")) {
            return this.promotionRepository.getAllByStatus(Status.PENDENTE);
        }
        throw new OperationNotAllowedException("Não permitido");
    }

    @Override
    public Promotion activatePromotion(long id){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!user.getRole().equals("ADMIN"))
            throw new OperationNotAllowedException("Usuário não permitido");
        Promotion promotion = promotionRepository.findById(id);
        if(promotion.getUrlLink() == null)
            throw new EmpytPhotoException("A promoção não possui uma foto");
        promotion.setStatus(Status.ATIVA);
        return this.promotionRepository.save(promotion);
        }

    @Override
    public List<Promotion> getClosed() {
        return this.promotionRepository.getAllByStatus(Status.ENCERRADA);
    }
}
