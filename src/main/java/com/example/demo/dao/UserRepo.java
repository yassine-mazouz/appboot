package com.example.demo.dao;

import com.example.demo.models.User;
import org.hibernate.annotations.Parameter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {


    @Query(value = "SELECT * FROM user u WHERE u.id = :id", nativeQuery = true)
    public User getOneUser(@Param("id") int id);


    @Query(value = "SELECT * from user", nativeQuery = true)
    public Page<User> getAll(PageRequest pageable);

    @Query(value = "SELECT * from user  where name like %?1% or lastname like %?1% or email like %?1% ",nativeQuery = true)
    public Page<User> getSearch( @Param("s") String s, PageRequest  pageRequest);



}
