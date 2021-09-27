package com.example.promotion.repositories;

import com.example.promotion.models.Promotion;
import com.example.promotion.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {


    Promotion findById(long id);
    @Query(value="SELECT p FROM Promotion p WHERE LOWER(p.name) LIKE %:promotion%")
    List<Promotion> findBySubstring(String promotion);
    List<Promotion> getAllByStatus(Status status);





}
