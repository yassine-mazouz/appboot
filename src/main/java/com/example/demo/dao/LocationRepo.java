package com.example.demo.dao;

import com.example.demo.models.Location;
import com.example.demo.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepo extends JpaRepository<Location,Integer> {

    @Query(value = "SELECT * from location  where name like %?1% ",nativeQuery = true)
    Page<Location> getSearch(String s, PageRequest pageable);

    @Query(value = "SELECT * from location", nativeQuery = true)
    Page<Location> getAll(PageRequest pageable);

    @Query(value = "SELECT * FROM location WHERE id = :id", nativeQuery = true)
    Location getOneLocation(int id);
}
