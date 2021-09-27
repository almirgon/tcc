package com.example.promotion.controllers;

import com.example.promotion.business.CommentBusinessDelegate;
import com.example.promotion.dto.CommentDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "Controller de comentarios")
@RestController
@RequestMapping("/promotion/{idPromotion}/comment")
public class CommentController {

    @Autowired
    private CommentBusinessDelegate commentBusinessDelegate;

    @CrossOrigin
    @PostMapping()
    @ApiOperation(value = "Cria um comentário para uma campanha")
    public ResponseEntity<CommentDTO> toComment(@PathVariable long idPromotion, @RequestBody CommentDTO commentDTO){
        return new ResponseEntity<>(this.commentBusinessDelegate.createComment(idPromotion,commentDTO), HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/{id}")
    @ApiOperation(value = "Responde um comentário de uma campanha")
    public ResponseEntity<CommentDTO> replyComment(@PathVariable long id, @RequestBody CommentDTO commentDTO){
        return new ResponseEntity<>(this.commentBusinessDelegate.replyComment(id,commentDTO), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Deleta o comentário de uma campanhas")
    public ResponseEntity<CommentDTO> deleteComment(@PathVariable long id){
        return new ResponseEntity<>(this.commentBusinessDelegate.removeComment(id), HttpStatus.OK);
    }

}
