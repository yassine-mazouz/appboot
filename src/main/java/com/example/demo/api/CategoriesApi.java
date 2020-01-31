package com.example.demo.api;

import com.example.demo.dao.CategoriesRepo;
import com.example.demo.models.Categories;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
public class CategoriesApi {
    @Autowired
    CategoriesRepo categoriesRepo;

    @RequestMapping(value = "/getAllCategories", method = RequestMethod.POST)
    public ResponseEntity<DataTable> getAllCategories(@RequestBody Map<String, Object> payload){
        Map<String, Object> model = new HashMap<>();


        int start = (int) payload.get("start");
        int draw = (int) payload.get("draw");
        int length = (int) payload.get("length");
        HashMap<String, Object> search = (HashMap<String, Object>) payload.get("search");
        String s = (String) search.get("value");

        ArrayList<HashMap<String, String>> order = (ArrayList<HashMap<String, String>>) payload.get("order");
        ArrayList<HashMap<String, Integer>> order1 = (ArrayList<HashMap<String, Integer>>) payload.get("order");

        String dir = order.get(0).get("dir");
        Integer column = order1.get(0).get("column");

        String sort="id";
        if(column==1){sort="name";}

        int page = start / length;

        PageRequest  pageable = PageRequest.of(
                page,
                length,
                Sort.by(sort)
        );
        Page<Categories> responseData;

        if(s!=null && s!="")
        {
            responseData = categoriesRepo.getSearch(s,pageable);
        }else{
            responseData = categoriesRepo.getAll(pageable);
        }




        DataTable dataTable = new DataTable();

        dataTable.setData(responseData.getContent());
        dataTable.setRecordsTotal(responseData.getTotalElements());
        dataTable.setRecordsFiltered(responseData.getTotalElements());
        dataTable.setDraw(draw);
        dataTable.setStart(start);



        return ResponseEntity.ok(dataTable);

    }


    @PostMapping("/deleteCategoriesRest/{id}")
    public void deleteCategoriesRest(@PathVariable int id) throws JsonProcessingException {

        categoriesRepo.deleteById(id);

    }

    @PostMapping(value = "/createcategories")
    public String createcategories(@RequestBody Categories categories){
        categoriesRepo.save(categories);
        return "Hi "+categories.getName()+" registration successfully";
    }


    @RequestMapping(value = "/GetOneCategoriesRest/{id}", method = RequestMethod.GET)
    public Categories GetOneCategoriesRest(@PathVariable int id){
        return  categoriesRepo.getOneCategories(id);
    }


    @PostMapping("/updatecategories/{id}")
    public String updatecategories(@RequestBody Categories categories) {

        categories.setName(categories.getName());
        categoriesRepo.save(categories);
        return "Hi "+categories.getName()+" User updated successfully.";
    }

}
