package com.example.promotion.controllers;

import com.example.promotion.models.User;
import com.example.promotion.services.user.UserService;

import java.util.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;


@Api(value = "Controller de usuários")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin()
    @ApiOperation(value = "Criar Usuário")
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        return new ResponseEntity<User>(this.userService.createUser(user), HttpStatus.CREATED);
    }

    @ApiOperation(value = "Recupera o usuário")
    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email){
        return new ResponseEntity<User>(this.userService.findUser(email), HttpStatus.OK);
    }

    @ApiOperation(value = "Pega usuário pelo id")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        return new ResponseEntity<User>(this.userService.getUserById(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Deleta o usuário")
    @DeleteMapping("/{email}")
    public void deleteUser(@PathVariable String email){
        this.userService.deleteUser(email);
        new ResponseEntity<>(HttpStatus.OK);
    }


}
