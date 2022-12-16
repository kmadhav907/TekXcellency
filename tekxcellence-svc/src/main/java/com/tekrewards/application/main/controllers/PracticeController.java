package com.tekrewards.application.main.controllers;


import com.tekrewards.application.main.dto.PracticeResponse;
import com.tekrewards.application.main.repositories.PracticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class PracticeController {

    @Autowired
    private PracticeRepository practiceRepository;

    @RequestMapping(value = "/practises" , method = RequestMethod.GET)
    public ResponseEntity<?> getAllPractices(){
        PracticeResponse practiceResponse = new PracticeResponse();
        practiceResponse.setStatus("success");
        practiceResponse.setData(practiceRepository.findAll());
        return ResponseEntity.ok(practiceResponse);
    }
}
