package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.AwardDetailsResponse;
import com.tekrewards.application.main.models.Award;
import com.tekrewards.application.main.pojo.AwardDetailsObject;
import com.tekrewards.application.main.repositories.AwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class AwardDetails {
    @Autowired
    private AwardRepository awardRepository;

    @RequestMapping(value="awardDetails/{awardName}")
    ResponseEntity<?> getAwardDetails(@PathVariable("awardName")String awardName){
        Optional<Award> award = awardRepository.findByAwardName(awardName);
        if(award.isPresent()){
            Award awardInDb = award.get();
            AwardDetailsObject awardDetailsObject = new AwardDetailsObject(awardInDb.getAwardID(), awardInDb.getAwardName(), awardInDb.getAwardBriefDescription(), awardInDb.getAwardMainDescription());
            AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("success", awardDetailsObject);
            return ResponseEntity.ok(awardDetailsResponse);
        }
        else{
            AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("error", "No Award Found");
            return ResponseEntity.ok(awardDetailsResponse);
        }
    }
    @RequestMapping(value="getAwards")
    ResponseEntity<?> getAwards(){
        List<Award> awardList = awardRepository.findAll();
        if(awardList.isEmpty()){
            AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("failed", "no data");
            return ResponseEntity.ok(awardDetailsResponse);
        }
        AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("success", awardList);
        System.out.println(awardList);
        return ResponseEntity.ok(awardDetailsResponse);
    }

    @RequestMapping(value="/addAward", method = RequestMethod.POST)
    ResponseEntity<?> addAward(@RequestBody AwardDetailsObject awardDetailsObject){
        System.out.println(awardDetailsObject);
        Award awardToBeAdded = new Award();
        awardToBeAdded.setAwardName(awardDetailsObject.getAwardName());
        awardToBeAdded.setAwardBriefDescription(awardDetailsObject.getAwardBriefDescription());
        awardToBeAdded.setAwardMainDescription(awardDetailsObject.getAwardMainDescription());
        awardRepository.save(awardToBeAdded);
        AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("success", "award added");
        return ResponseEntity.ok(awardDetailsResponse);
    }

    @RequestMapping(value="/updateAward", method = RequestMethod.PUT)
    ResponseEntity<?> updateAward(@RequestBody AwardDetailsObject awardDetailsObject){
        Award award = awardRepository.findById(awardDetailsObject.getAwardId()).get();
        award.setAwardName(awardDetailsObject.getAwardName());
        award.setAwardBriefDescription(awardDetailsObject.getAwardBriefDescription());
        award.setAwardMainDescription(awardDetailsObject.getAwardMainDescription());
        awardRepository.save(award);
        AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("success", "award updated");
        return ResponseEntity.ok(awardDetailsResponse);
    }

    @RequestMapping(value="/deleteAward/{awardId}", method = RequestMethod.DELETE)
    ResponseEntity<?> deleteAward(@PathVariable("awardId") Long awardId){
        Award award = awardRepository.findById(awardId).get();
        awardRepository.delete(award);
        AwardDetailsResponse awardDetailsResponse = new AwardDetailsResponse("success","award deleted");
        return ResponseEntity.ok(awardDetailsResponse);
    }
}
