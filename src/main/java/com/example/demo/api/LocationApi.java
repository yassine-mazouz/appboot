package com.example.demo.api;

import com.example.demo.dao.LocationRepo;
import com.example.demo.dao.UserRepo;
import com.example.demo.models.Location;
import com.example.demo.models.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
public class LocationApi {
    @Autowired
    LocationRepo locationRepo;

    @RequestMapping(value = "/getAllLocation", method = RequestMethod.POST)
    public ResponseEntity<DataTable> getAllLocation(@RequestBody Map<String, Object> payload){
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
        Page<Location> responseData;

        if(s!=null && s!="")
        {
            responseData = locationRepo.getSearch(s,pageable);
        }else{
            responseData = locationRepo.getAll(pageable);
        }




        DataTable dataTable = new DataTable();

        dataTable.setData(responseData.getContent());
        dataTable.setRecordsTotal(responseData.getTotalElements());
        dataTable.setRecordsFiltered(responseData.getTotalElements());
        dataTable.setDraw(draw);
        dataTable.setStart(start);



        return ResponseEntity.ok(dataTable);

    }


    @PostMapping("/deleteLocationRest/{id}")
    public void deleteUserRest(@PathVariable int id) throws JsonProcessingException {

        locationRepo.deleteById(id);

    }

    @PostMapping(value = "/createlocation")
    public String createlocation(@RequestBody Location location){
        locationRepo.save(location);
        return "Hi "+location.getName()+" registration successfully";
    }


    @RequestMapping(value = "/GetOneLocationRest/{id}", method = RequestMethod.GET)
    public Location GetOneLocationRest(@PathVariable int id){
        return  locationRepo.getOneLocation(id);
    }


    @PostMapping("/updatelocation/{id}")
    public String updatelocation(@RequestBody Location location) {

        location.setName(location.getName());
        locationRepo.save(location);
        return "Hi "+location.getName()+" User updated successfully.";
    }

}
