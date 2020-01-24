package com.example.demo.services;

import com.example.demo.dao.UserRepo;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class UserServicesImple implements UserServices{
    @Value("${demo.url}")
    private String url;
    @Autowired
    UserRepo repo;


    @Override
    public User[] getAll() {
        final String uri = url+ "/getAllRest";
        RestTemplate restTemplate = new RestTemplate();
        User[] result = restTemplate.getForObject(uri, User[].class);
        return result;
    }

    @Override
    public void addUser(String nom, String prenom,int id) {
        final String uri = url+ "/addUserRest/"+nom+"/"+prenom+"/"+id;
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.put(uri, User.class);

    }

    @Override
    public void deleteuser(int id) {
        final String uri = url+"/deleteUserRest/"+id;
        RestTemplate restTemplate=new RestTemplate();
        restTemplate.put(uri,User.class);
    }

    @Override
    public User GetOneUser(int id) {
        final String uri = url+ "/GetOneUserRest/"+id;
        RestTemplate restTemplate = new RestTemplate();
        User result = restTemplate.getForObject(uri, User.class);
        return result;
    }


}
