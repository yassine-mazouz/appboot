package com.example.demo.models;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Categories {

    public Categories() {
        super();
    }

    public Categories(String nameimg,String type, byte[] picByte) {
        this.nameimg = nameimg;
        this.type = type;
        this.picByte = picByte;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "name", nullable = true)
    private String name;
    @Column(name = "deleted", nullable = true)
    private String deleted;
    @Column(name = "nameimg")
    private String nameimg;
    @Column(name = "type")
    private String type;
    @Column(name = "picByte", length = 1000)
    private byte[] picByte;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeleted() {
        return deleted;
    }

    public void setDeleted(String deleted) {
        this.deleted = deleted;
    }




    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }


    public String getNameimg() {
        return nameimg;
    }

    public void setNameimg(String nameimg) {
        this.nameimg = nameimg;
    }
    
    
}
