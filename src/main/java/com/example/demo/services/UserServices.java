package com.example.demo.services;

import com.example.demo.models.User;

public interface UserServices {
    public User[] getAll();

    public void addUser(String nom, String prenom,int id);

    public void deleteuser(int id);

    public User GetOneUser(int id);

}
