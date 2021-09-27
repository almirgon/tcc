package com.example.promotion.repositories;

import com.example.promotion.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment save(Comment comment);
    Optional<Comment> findById(long id);
}
