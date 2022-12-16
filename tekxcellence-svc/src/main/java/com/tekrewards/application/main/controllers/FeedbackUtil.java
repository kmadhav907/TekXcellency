package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.AdminFeedbackResponse;
import com.tekrewards.application.main.dto.FeedbackRequest;
import com.tekrewards.application.main.dto.FeedbackResponse;
import com.tekrewards.application.main.models.Feedback;
import com.tekrewards.application.main.pojo.AdminFeedbackInfo;
import com.tekrewards.application.main.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FeedbackUtil {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @RequestMapping(value="/feedback-add", method= RequestMethod.POST)
    public ResponseEntity<?> addFeedBack(@RequestBody FeedbackRequest feedbackRequest){
        System.out.println(feedbackRequest);
        Feedback feedback = new Feedback(feedbackRequest.getName(), feedbackRequest.getEmail(), feedbackRequest.getFeedback(), feedbackRequest.getRating());
        feedbackRepository.save(feedback);
        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setMessage("Added successfully");
        feedbackResponse.setStatus("success");
        return ResponseEntity.ok(feedbackResponse);
    }

    @RequestMapping(value="/get-feedback", method = RequestMethod.GET)
    public ResponseEntity<?> listAllFeedback(){
        List<Feedback> feedbackList = feedbackRepository.findAll();
        FeedbackResponse feedbackResponse = new FeedbackResponse();
        feedbackResponse.setStatus("success");
        feedbackResponse.setMessage(feedbackList);
        return ResponseEntity.ok(feedbackResponse);
    }

    @RequestMapping(value="/admin/feedback" ,method=RequestMethod.GET)
    public ResponseEntity<?> getMasterListForFeedback(Pageable pageable){
        Page<Feedback> feedbackList = feedbackRepository.findAll(pageable);
        List<Feedback> feedbacks = feedbackList.getContent();
        AdminFeedbackResponse adminFeedbackResponse = new AdminFeedbackResponse();
        adminFeedbackResponse.setFeedbackList(feedbacks);
        adminFeedbackResponse.setTotalNumberOfFeedback(feedbackList.getTotalElements());
        adminFeedbackResponse.setStatus("success");
        return ResponseEntity.ok(adminFeedbackResponse);
    }
}
