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

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {


    @Query(value = "SELECT * FROM user u WHERE u.id = :id", nativeQuery = true)
    public User getOneUser(@Param("id") int id);


    @Query(value = "SELECT * from user", nativeQuery = true)
    public Page<User> getAll(PageRequest page);

    @Query(value = "SELECT * from user where id like '%:s%' or last_name like '%:s%' or name like '%:s%' or email like '%:s%'", nativeQuery = true)
    public Page<User> getSearch(PageRequest pageable, @Param("s") String s);
}
