package com.example.promotion.repositories;

import com.example.promotion.dto.UserDTO;
import com.example.promotion.models.User;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserById(long id);
    User findUserByEmail(String email);
    List<User> findAll();
    Boolean existsByEmailIgnoreCase(String email);
}
