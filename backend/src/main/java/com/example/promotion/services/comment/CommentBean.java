package com.example.promotion.services.comment;

import com.example.promotion.exceptions.OperationNotAllowedException;
import com.example.promotion.exceptions.comment.CommentInvalidException;
import com.example.promotion.exceptions.comment.CommentNullException;
import com.example.promotion.models.Comment;
import com.example.promotion.models.Promotion;
import com.example.promotion.models.User;
import com.example.promotion.repositories.CommentRepository;
import com.example.promotion.services.promotion.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentBean implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PromotionService promotionService;

    @Override
    public Comment findById(long id) {
        Optional<Comment> comment = this.commentRepository.findById(id);
        if(!comment.isPresent()){
            throw new CommentNullException("Comentário não existe");
        }
        if(comment.get().isCommentDeleted()){
            throw new CommentInvalidException("Comentário Apagado!");
        }
        return comment.get();
    }

    @Override
    public List<Comment> findAll() {
        List<Comment> comments = this.commentRepository.findAll();
        return comments;
    }

    @Override
    public Comment createComment(long idPromotion, Comment comment) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Promotion promotion = this.promotionService.findById(idPromotion);
        comment.setUser(user);
        Date data = new Date();
        SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        comment.setDate(formatador.format(data));
        comment.setCommentDeleted(false);
        commentRepository.save(comment);
        promotion.addComment(comment);
        promotionService.updatePromotion(promotion);
        return comment;
    }

    @Override
    public Comment ReplyComment(long id, Comment comment) {
        Optional<Comment> parent = commentRepository.findById(id);
        Date data = new Date();
        SimpleDateFormat formatador = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        comment.setDate(formatador.format(data));
        comment.setCommentDeleted(false);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setUser(user);
        commentRepository.save(comment);
        parent.get().addAnswer(comment);
        commentRepository.save(parent.get());
        return comment;

    }

    @Override
    public Comment deleteComment(long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(!(comment.get().getUser().equals(user))){
            throw new OperationNotAllowedException("O comentário não pertence ao usuario logado");
        }
        comment.get().setCommentDeleted(true);
        deleteChildrens(comment.get().getAnswers());
        commentRepository.save(comment.get());
        return comment.get();

    }

    private void deleteChildrens(List<Comment> list) {
        if (!list.isEmpty()) {
            for (int i = 0; i < list.size(); i++) {
                list.get(i).setCommentDeleted(true);
                deleteChildrens(list.get(i).getAnswers());
            }
        }
    }
}
