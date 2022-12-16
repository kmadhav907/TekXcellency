package com.tekrewards.application.main.controllers;


import com.tekrewards.application.main.dto.DesignationResponse;
import com.tekrewards.application.main.models.Designation;
import com.tekrewards.application.main.repositories.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
public class DesignationController {

    @Autowired
    private DesignationRepository designationRepository;

    @RequestMapping(value = "/designations", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDesignations(){
        List<Designation> designationList = designationRepository.findAll();
        DesignationResponse designationResponse = new DesignationResponse();
        designationResponse.setData(designationList);
        designationResponse.setStatus("success");
        return  ResponseEntity.ok(designationResponse);
    }
}
