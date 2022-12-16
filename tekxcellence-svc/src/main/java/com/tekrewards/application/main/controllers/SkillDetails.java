package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.GetSkillResponse;
import com.tekrewards.application.main.repositories.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class SkillDetails {
    @Autowired
    private SkillRepository skillRepository;

    @RequestMapping(value="/skilllist", method = RequestMethod.GET)
    public ResponseEntity<?> getSkillList() {
        return ResponseEntity.ok(new GetSkillResponse("success", skillRepository.findAll()));
    }
}
