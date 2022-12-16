package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.UpdateNumOfVotesResponse;
import com.tekrewards.application.main.dto.VoteDetailsRequest;
import com.tekrewards.application.main.dto.VoteResponse;
import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.models.Vote;
import com.tekrewards.application.main.repositories.EmployeeRepository;
import com.tekrewards.application.main.repositories.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class VoteDetails {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Value("${employee.numofvotes}")
    Long numberOfVotes;
    @Autowired
    private VoteRepository voteRepository;

    @RequestMapping(value = "/addvote", method = RequestMethod.POST)
    public ResponseEntity<?> addVote(@RequestBody VoteDetailsRequest voteDetailsRequest){
        System.out.println(voteDetailsRequest);
        Optional<Vote> voteInDB = voteRepository.findByVotedByIdAndVotedToId(voteDetailsRequest.getVotedById(), voteDetailsRequest.getVoteToId());
        Employee employee = employeeRepository.findById(voteDetailsRequest.getVotedById()).get();
        if(voteInDB.isPresent()) {
            VoteResponse voteResponse = new VoteResponse("error", "you have already voted for employee");
            return ResponseEntity.status(400).body(voteResponse);
        }
        else {
            Vote voteToBeInserted = new Vote();
            voteToBeInserted.setVotedToId(voteDetailsRequest.getVoteToId());
            voteToBeInserted.setVotedById(voteDetailsRequest.getVotedById());
            voteToBeInserted.setPointsGained(voteDetailsRequest.getPoints());
            voteToBeInserted.setFeedback(voteDetailsRequest.getFeedback());
            voteToBeInserted.setManagerId(employee.getManagerId());
            voteToBeInserted.setCreatedAt(LocalDateTime.now());
            voteToBeInserted.setAwardId(1L);
            voteRepository.save(voteToBeInserted);
            System.out.println(voteInDB);
            VoteResponse voteResponse = new VoteResponse("success", "successfully voted");
            return ResponseEntity.ok(voteResponse);
        }

    }
    @RequestMapping(value = "/vote-update", method = RequestMethod.PUT)
    ResponseEntity<?> updateEmployeeNumberOfVotes(){
        List<Employee> employeeList = employeeRepository.findAll();
        employeeList.forEach(employee -> employee.setNumberOfVotes(numberOfVotes));
        employeeRepository.saveAll(employeeList);
        UpdateNumOfVotesResponse updateNumOfVotesResponse = new UpdateNumOfVotesResponse();
        updateNumOfVotesResponse.setStatus("success");
        return ResponseEntity.ok(updateNumOfVotesResponse);
    }
}
