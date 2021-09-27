package com.example.promotion.controllers;

import com.example.promotion.business.PromotionBusinessDelegate;
import com.example.promotion.dto.PromotionDTO;
import com.example.promotion.models.Promotion;
import com.example.promotion.services.promotion.PromotionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@Api(value = "Controller de promoção")
@RestController
@RequestMapping("/promotion")
public class PromotionController {

    @Autowired
    private PromotionBusinessDelegate promotionBusinessDelegate;

    @Autowired
    private PromotionService promotionService;

    @CrossOrigin()
    @ApiOperation(value = "Cria uma promoção")
    @PostMapping
    public ResponseEntity<PromotionDTO> createPromotion(@RequestBody PromotionDTO promotionDTO){
        return new ResponseEntity<>(this.promotionBusinessDelegate.createPromotion(promotionDTO), HttpStatus.CREATED);
    }

    @CrossOrigin()
    @ApiOperation(value = "Deleta uma promoção")
    @DeleteMapping("/{id}")
    public void deletePromotion(@PathVariable long id){
        this.promotionBusinessDelegate.delete(id);
        new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Muda o status de uma promoção")
    @PostMapping("status/{id}")
    public ResponseEntity<PromotionDTO> setStatus(@PathVariable long id){
        return new ResponseEntity<>(this.promotionBusinessDelegate.setStatus(id), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Pega a promoção pelo id")
    @GetMapping("/{id}")
    public ResponseEntity<PromotionDTO> getPromotion(@PathVariable long id){
        return new ResponseEntity<>(this.promotionBusinessDelegate.findById(id), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Aprova a promoção")
    @PutMapping("/{id}")
    public ResponseEntity<PromotionDTO> ApprovePromotion(@PathVariable long id, @RequestBody Promotion promotion){
        return new ResponseEntity<>(this.promotionBusinessDelegate.ApprovePromotion(id,promotion), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Encerra promocao")
    @PutMapping("/close/{id}")
    public ResponseEntity<PromotionDTO> closePromotion(@PathVariable long id){
        return new ResponseEntity<>(this.promotionBusinessDelegate.closePromotion(id), HttpStatus.OK);
    }


    @CrossOrigin()
    @ApiOperation(value = "Busca uma promoção por meio de uma substring")
    @GetMapping("search/{promotion}")
    public ResponseEntity<List<PromotionDTO>> getPromotionsBySubstring(@PathVariable String promotion){
        return new ResponseEntity<>(this.promotionBusinessDelegate.findbySubstring(promotion), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Dar like em uma promoção")
    @PostMapping("/like/{id}")
    public ResponseEntity<PromotionDTO> likePromotion(@PathVariable long id){
        return new ResponseEntity<>(this.promotionBusinessDelegate.toLike(id), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Retorna uma lista de promoções ativas")
    @GetMapping("/actives")
    public ResponseEntity<List<PromotionDTO>> getPromotionsActives(){
        return new ResponseEntity<>(this.promotionBusinessDelegate.getActives(), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Retorna para o usuário admin uma lista de promoções pendentes")
    @GetMapping("/pendings")
    public ResponseEntity<List<PromotionDTO>> getPromotionsPendings(){
        return new ResponseEntity<>(this.promotionBusinessDelegate.getPendings(), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Retorna uma lista de promoções encerradas")
    @GetMapping("/closers")
    public ResponseEntity<List<PromotionDTO>> getPromotionsClosers(){
        return new ResponseEntity<>(this.promotionBusinessDelegate.getCloses(), HttpStatus.OK);
    }

    @CrossOrigin()
    @ApiOperation(value = "Usuário admin aprova uma promoção pendente")
    @PostMapping("/active/{id}")
    public ResponseEntity<PromotionDTO> activatePromotion(@PathVariable long id){
        return new ResponseEntity<PromotionDTO>(this.promotionBusinessDelegate.activatePromotion(id), HttpStatus.OK);
    }


}
