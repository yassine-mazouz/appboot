package com.example.demo.api;

import com.example.demo.dao.UserRepo;
import com.example.demo.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
public class UserApi {
    @Autowired
    UserRepo userRepo;



    @RequestMapping(value = "/getAllRestng", method = RequestMethod.POST)
    public ResponseEntity<DataTable> getAllRestng(@RequestBody Map<String, Object> payload){
        Map<String, Object> model = new HashMap<>();


        int start = (int) payload.get("start");
        int draw = (int) payload.get("draw");
        int length = (int) payload.get("length");
        HashMap<String, Object> search = (HashMap<String, Object>) payload.get("search");
        String s = (String) search.get("value");
//        HashMap<String, Object> order = (HashMap<String, Object>) payload.get("order");
//        String order = (String) payload.get("order");

//        int column = (int) order.get("column");
//        String dir = order.get("dir").toString();

//        String sort="id";
//        if(column==1){sort="name";}
//        if(column==2){sort="lastName";}
//        if(column==3){sort="email";}

        int page = start / length;
        PageRequest pageable =  PageRequest.of(
                page,
                length
//                ,Sort.by(sort)
        );
        Page<User> responseData;

        if(s!=null && s!="")
        {
          responseData = userRepo.getSearch(pageable,s);

        }else{
            responseData = userRepo.getAll(pageable);

        }


        DataTable dataTable = new DataTable();

        dataTable.setData(responseData.getContent());
        dataTable.setRecordsTotal(responseData.getTotalElements());
        dataTable.setRecordsFiltered(responseData.getTotalElements());
        dataTable.setDraw(draw);
        dataTable.setStart(start);


        return ResponseEntity.ok(dataTable);

    }


    @RequestMapping(value = "/getAllRest", method = RequestMethod.GET)
    public List<User> getAll(){
        return  userRepo.findAll();
    }

    @RequestMapping(value = "/addUserRest/{nom}/{prenom}/{id}", method = RequestMethod.PUT)
    public void addUserRest(@PathVariable String nom, @PathVariable String prenom, @PathVariable int id) throws JsonProcessingException {


        if(id != 0) {
            User saveusr = userRepo.findById(id).get();
            saveusr.setName(prenom);
            saveusr.setLastName(nom);
            userRepo.save(saveusr);

        }else {
            User saveusr = new User();
            saveusr.setName(prenom);
            saveusr.setLastName(nom);

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
