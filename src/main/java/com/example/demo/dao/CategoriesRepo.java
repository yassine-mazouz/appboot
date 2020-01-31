package com.example.demo.dao;

import com.example.demo.models.Categories;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepo extends JpaRepository<Categories,Integer> {

    @Query(value = "SELECT * from categories  where name like %?1% ",nativeQuery = true)
    Page<Categories> getSearch(String s, PageRequest pageable);

    @Query(value = "SELECT * from categories", nativeQuery = true)
    Page<Categories> getAll(PageRequest pageable);

    @Query(value = "SELECT * FROM categories WHERE id = :id", nativeQuery = true)
    Categories getOneCategories(int id);
}
