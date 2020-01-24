package com.example.demo.dao;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {


    @Query(value = "SELECT * FROM user u WHERE u.id = :id", nativeQuery = true)
    public User getOneUser(@Param("id") int id);

}
