package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.*;
import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.models.Vote;
import com.tekrewards.application.main.models.Winner;
import com.tekrewards.application.main.pojo.*;
import com.tekrewards.application.main.repositories.EmployeeRepository;
import com.tekrewards.application.main.dto.WinnerDetailsResponse;
import com.tekrewards.application.main.models.Award;
import com.tekrewards.application.main.models.Vote;
import com.tekrewards.application.main.models.Winner;
import com.tekrewards.application.main.pojo.WinnerDetailsObject;
import com.tekrewards.application.main.repositories.AwardRepository;
import com.tekrewards.application.main.repositories.VoteRepository;
import com.tekrewards.application.main.repositories.WinnerRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class WinnersDetails {
    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private AwardRepository awardRepository;
    @Autowired
    private WinnerRepository winnerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping(value="/winner/{awardId}", method = RequestMethod.POST)
    ResponseEntity<?> calculateWinner(@PathVariable("awardId") Long awardId, @RequestBody WinnerPostObject winnerPostObject){
        System.out.println(winnerPostObject);
        Employee employee = employeeRepository.findByName(winnerPostObject.getEmployeeName()).get();
        Winner winnerToBeInserted = new Winner();
        winnerToBeInserted.setEmployeeId(employee.getEmployeeId());
        winnerToBeInserted.setAwardId(awardId);
        winnerToBeInserted.setPointsGained(winnerPostObject.getPointsGained());
        winnerRepository.save(winnerToBeInserted);
        WinnerDetailsResponse winnerDetailsResponse = new WinnerDetailsResponse("success","winner saved successfully");
        return ResponseEntity.ok(winnerDetailsResponse);
    }

//    @RequestMapping(value="/winner/{awardId}", method = RequestMethod.POST)
//    ResponseEntity<?> calculateWinner(@PathVariable("awardId") Long awardId){
//        List<Vote> voteList = voteRepository.findByAwardId(awardId);
//        HashMap<Long, HashMap<Long,Double>> teamMapping = new HashMap<>();
//        HashMap<Long,Double> cumulativePoints = new HashMap<>();
//        voteList.forEach(vote -> {
//            if(!cumulativePoints.containsKey(vote.getVotedToId())){
//                cumulativePoints.put(vote.getVotedToId(),vote.getPointsGained());
//            }
//            else{
//                double newPoints = cumulativePoints.get(vote.getVotedToId()) + vote.getPointsGained();
//                cumulativePoints.replace(vote.getVotedToId(), newPoints);
//            }
//        });
//
//        List<Long> l = new ArrayList<Long>(cumulativePoints.keySet());
//        l.forEach(empId -> {
//            Optional<Employee> emp = employeeRepository.findById(empId);
//            if(emp.isPresent()){
//                Employee employee = emp.get();
//                HashMap<Long,Double> tempCumulativePoints = new HashMap<>();
//                if(!teamMapping.containsKey(employee.getManagerId())){
//                    tempCumulativePoints.put(empId,cumulativePoints.get(empId));
//                    teamMapping.put(employee.getManagerId(),tempCumulativePoints);
//                }
//                else{
//                    tempCumulativePoints = teamMapping.get(employee.getManagerId());
//                    tempCumulativePoints.put(empId,cumulativePoints.get(empId));
//                }
//            }
//        });
//        System.out.println(cumulativePoints);
//        System.out.println(teamMapping);
//
//        teamMapping.forEach((managerId,team) -> {
//            double maxPoints = Collections.max(team.values());
//            for(Map.Entry<Long,Double> entry : team.entrySet()){
//                if(entry.getValue() == maxPoints){
//                    Long winnerEmployeeId = entry.getKey();
//                    Winner winnerToBeInserted = new Winner();
//                    winnerToBeInserted.setEmployeeId(winnerEmployeeId);
//                    winnerToBeInserted.setAwardId(awardId);
//                    winnerToBeInserted.setPointsGained(maxPoints);
//                    winnerRepository.save(winnerToBeInserted);
//                    System.out.println(winnerToBeInserted);
//                }
//            }
//        });
//        WinnerDetailsResponse winnerDetailsResponse = new WinnerDetailsResponse("success","winner saved successfully");
//        return ResponseEntity.ok(winnerDetailsResponse);
//    }

    @RequestMapping(value="/getWinnersAdmin/{awardId}", method = RequestMethod.GET)
    ResponseEntity<?> getWinners(@PathVariable("awardId") Long awardId){
        List<Vote> voteList = voteRepository.findByAwardId(awardId);
        HashMap<Long, HashMap<Long,Double>> teamMapping = new HashMap<>();
        HashMap<Long,Double> cumulativePoints = new HashMap<>();
        HashMap<String,HashMap<String,Double>> namedTeamMapping = new HashMap<>();

        voteList.forEach(vote -> {
            if(!cumulativePoints.containsKey(vote.getVotedToId())){
                cumulativePoints.put(vote.getVotedToId(),vote.getPointsGained());
            }
            else{
                double newPoints = cumulativePoints.get(vote.getVotedToId()) + vote.getPointsGained();
                cumulativePoints.replace(vote.getVotedToId(), newPoints);
            }
        });

        List<Long> l = new ArrayList<Long>(cumulativePoints.keySet());
        l.forEach(empId -> {
            Optional<Employee> emp = employeeRepository.findById(empId);
            if(emp.isPresent()){
                Employee employee = emp.get();
                HashMap<Long,Double> tempCumulativePoints = new HashMap<>();
                if(!teamMapping.containsKey(employee.getManagerId())){
                    tempCumulativePoints.put(empId,cumulativePoints.get(empId));
                    teamMapping.put(employee.getManagerId(),tempCumulativePoints);
                }
                else{
                    tempCumulativePoints = teamMapping.get(employee.getManagerId());
                    tempCumulativePoints.put(empId,cumulativePoints.get(empId));
                }
            }
        });
        System.out.println(cumulativePoints);
        System.out.println(teamMapping);

        teamMapping.forEach((managerId, team) -> {
            double maxPoints = Collections.max(team.values());
            Employee manager = employeeRepository.findById(managerId).get();
            HashMap<String,Double> tempHM = new HashMap<>();
            namedTeamMapping.put(manager.getName(),tempHM);
            for(Map.Entry<Long,Double> entry : team.entrySet()){
                Employee employee = employeeRepository.findById(entry.getKey()).get();
                tempHM.put(employee.getName(),entry.getValue());
            }
            tempHM.put("max",maxPoints);
            namedTeamMapping.replace(manager.getName(),tempHM);
        });

//        teamMapping.forEach((managerId,team) -> {
//            double maxPoints = Collections.max(team.values());
//            for(Map.Entry<Long,Double> entry : team.entrySet()){
//                HashMap<String,Double> tempHM = new HashMap<>();
////                Long winnerEmployeeId = entry.getKey();
//                Employee emp = employeeRepository.findById(entry.getKey()).get();
//                Employee empManager = employeeRepository.findById(emp.getManagerId()).get();
//                if(!namedTeamMapping.containsKey(emp.getManagerId())){
//                    tempHM.put(emp.getName(),entry.getValue());
//                    namedTeamMapping.put(empManager.getName(),tempHM);
//                }
//                else{
//                    tempHM = namedTeamMapping.get(emp.getManagerId());
//                    tempHM.put(emp.getName(),entry.getValue());
//                    namedTeamMapping.replace(empManager.getName(),tempHM);
//                }
//                tempHM.put("max",maxPoints);
//            }
//        });

        WinnerDetailsForAdminResponse winnerDetailsForAdminResponse = new WinnerDetailsForAdminResponse(namedTeamMapping,"success");
        return ResponseEntity.ok(winnerDetailsForAdminResponse);
    }
    @RequestMapping(method = RequestMethod.GET, path = "/get-chart-details")
    public  ResponseEntity<?> getChartDetails(){
        ChartDetailsResponse chartDetailsResponse = new ChartDetailsResponse();
       List<Award> awards =  awardRepository.findAll();
    List<ChartPojo> chartPojoList = new ArrayList<>();
       for(Award award: awards) {
           Long numberOfWinners = Long.valueOf((winnerRepository.findByAwardId(award.getAwardID()).size()));
           String awardName = award.getAwardName();
           Long id = award.getAwardID();
           ChartPojo chartPojo = new ChartPojo();
           chartPojo.setId(id);
           chartPojo.setName(awardName);
           chartPojo.setNumberOfWinners(numberOfWinners);
           chartPojoList.add(chartPojo);

       }
       chartDetailsResponse.setStatus("success");
       chartDetailsResponse.setChartDetails(chartPojoList);
       return ResponseEntity.ok(chartDetailsResponse);
    }
    @RequestMapping(value = "/get-winner-details/{awardId}" , method = RequestMethod.GET)
    public ResponseEntity<?> getEmployeeWinners(@PathVariable("awardId") Long awardId) {
        List<WinnerForChart> winnerForCharts = new ArrayList<>();
       List<Winner> winners =  winnerRepository.findByAwardId(awardId);
       for(Winner winner: winners){
           WinnerForChart winnerForChart = new WinnerForChart();
           winnerForChart.setEmployeeId(winner.getEmployeeId());
           winnerForChart.setEmployeeName(employeeRepository.findById(winner.getEmployeeId()).get().getName());
           winnerForCharts.add(winnerForChart);
       }
        WinnerForChartResponse winnerForChartResponse = new WinnerForChartResponse();
       winnerForChartResponse.setWinnerForCharts(winnerForCharts);
       winnerForChartResponse.setStatus("success");
       return ResponseEntity.ok(winnerForChartResponse);
    }
 //   awardRepository.findAll() -> itr -> (awardID)
}
