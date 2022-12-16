package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.AwardResponse;
import com.tekrewards.application.main.repositories.AwardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
public class AwardController {
    private AwardRepository awardRepository;


    @RequestMapping(value = "/get-awards", method = RequestMethod.GET)
    public ResponseEntity<?> getAllAwards(){
        AwardResponse awardResponse = new AwardResponse("success", awardRepository.findAll());
        return ResponseEntity.ok(awardResponse);
    }
}
