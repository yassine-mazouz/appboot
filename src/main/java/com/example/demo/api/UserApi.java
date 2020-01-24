package com.example.demo.api;

import com.example.demo.dao.UserRepo;
import com.example.demo.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
public class UserApi {
    @Autowired
    UserRepo userRepo;
    @RequestMapping(value = "/getAllRest", method = RequestMethod.GET)
    public List<User> getAll(){
        return  userRepo.findAll();
    }


    @RequestMapping(value = "/addUserRest/{nom}/{prenom}/{id}", method = RequestMethod.PUT)
    public void addUserRest(@PathVariable String nom, @PathVariable String prenom, @PathVariable int id) throws JsonProcessingException {


        if(id != 0) {
            User saveusr = userRepo.findById(id).get();
            saveusr.setName(nom);
            saveusr.setLastName(prenom);
            userRepo.save(saveusr);

        }else {
            User saveusr = new User();
            saveusr.setName(nom);
            saveusr.setLastName(prenom);

            userRepo.save(saveusr);
        }
    }

    @RequestMapping(value = "/deleteUserRest/{id}", method = RequestMethod.PUT)
    public void deleteUserRest(@PathVariable int id) throws JsonProcessingException {

        if(id != 0) {
            userRepo.deleteById(id);

        }
    }
    @RequestMapping(value = "/GetOneUserRest/{id}", method = RequestMethod.GET)
    public User GetOneUserRest(@PathVariable int id){
        return  userRepo.getOneUser(id);
    }
}
