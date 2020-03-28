package com.example.demo.api;

import com.example.demo.dao.CategoriesRepo;
import com.example.demo.models.Categories;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.ServerResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


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

  /*  @PostMapping(value = "/createcategories")
    public String createcategories(@RequestBody Categories categories){
        categoriesRepo.save(categories);
        return "Hi "+categories.getName()+" registration successfully";
    }
*/

    @RequestMapping(value = "/GetOneCategoriesRest/{id}", method = RequestMethod.GET)
    public Categories GetOneCategoriesRest(@PathVariable int id){
        return  categoriesRepo.getOneCategories(id);
    }


    @PostMapping("/createcategories")
    public String createcategories(@RequestParam("nom") String  nom,@RequestParam("imageFile") MultipartFile file) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        Categories  img = new Categories(file.getOriginalFilename(), file.getContentType(),
                file.getBytes());

        img.setName(nom);


        categoriesRepo.save(img);
        return "Hi registration successfully";
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException ignored) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
    
    /*------------------------------------------------------------------------------------------/**/


    @GetMapping(path = { "/affichimages/{imageName}" })
    public Categories getImage(@PathVariable("imageName") String imageName) throws IOException {
        final Optional<Categories> retrievedImage = categoriesRepo.findByName(imageName);
        Categories  img = new Categories(retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }
    
    
    
    
    

}
