package com.example.demo.controller;

import com.example.demo.dao.UserRepo;
import com.example.demo.models.User;
import com.example.demo.services.UserServices;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    private UserServices userServices;
    @Autowired
    private  UserRepo userRepo;

    @RequestMapping("/")
    public ModelAndView welcome() {
        Map<String, Object> model = new HashMap<String, Object>();
        User[] usr =  userServices.getAll();
        model.put("All",usr);
        return new ModelAndView("index", model);
    }
    @RequestMapping(value="/add", method = RequestMethod.GET)
    public String add(HttpServletRequest nom, HttpServletRequest prenom, HttpServletRequest id) {

        String nomm = nom.getParameter("nom");
        String prenomm = prenom.getParameter("prenom");
        String idd = id.getParameter("id");
        int idint=0;
        if(idd != null && idd!="")
        {
          idint = Integer.parseInt(idd);

        }
        if(nomm != null && nomm!="" && prenomm != null && prenomm!="") {
            userServices.addUser(nomm, prenomm, idint);
        }
        return "redirect:/";
    }


    @RequestMapping(value="/getOneUseser", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> getOneUseser(@RequestParam int id) throws JsonProcessingException {
        Map<String, Object> model = new HashMap<String, Object>();
        User usr = userServices.GetOneUser(id);
        model.put("oneuser",usr);

        return model;
    }
    @RequestMapping(value="/deleteUser",method = RequestMethod.GET)
    public  String deleteUser(HttpServletRequest id)
    {
        String idd = id.getParameter("id");
        int idint=0;
        if(idd != null && idd !="")
        {
            idint = Integer.parseInt(idd);

            userServices.deleteuser(idint);
        }


        return "redirect:/";
    }
}
