package com.tekrewards.application.main.runners;

import com.tekrewards.application.main.constants.*;
import com.tekrewards.application.main.models.*;
import com.tekrewards.application.main.repositories.*;
import com.tekrewards.application.main.utility.Encryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class LoadDataRunner implements ApplicationRunner {

    final List<String> skillNames = Arrays.asList(SkillConstants.PUNCTUALITY, SkillConstants.TECHNICAL_SKILLS, SkillConstants.TEAM_WORK,
            SkillConstants.QUALITY_OF_WORK, SkillConstants.COMMUNICATION);
    final List<String> designationNames = Arrays.asList(DesignationConstants.TECHNICAL_SERVICE_MANAGER, DesignationConstants.ASSOSCIATE_ENGINEER, DesignationConstants.ADMIN);

   final List<String> awardNames = Arrays.asList(AwardConstants.SPOT_AWARDS,AwardConstants.RISING_STAR_AWARDS,AwardConstants.ZEN_MASTER,AwardConstants.LIGHT_HOUSE,AwardConstants.WORK_ANNIVERSARY_AWARDS,AwardConstants.BEST_PROJECT_OF_QUARTER,AwardConstants.CUSTOMER_MVP,AwardConstants.BEST_INNOVATION_OF_QUARTER);
    final List<String> practiseNames = Arrays.asList(PracticeConstants.CD, PracticeConstants.TDC, PracticeConstants.DA, PracticeConstants.DI);
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private Encryption encryption;
    @Autowired
    private SkillRepository skillRepository;
@Autowired
private AwardRepository awardRepository;
    @Autowired
    private WinnerRepository winnerRepository;
    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private PracticeRepository practiceRepository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Adding Skills to the database");
        skillRepository.deleteAll();
        List<Skills> skillsList = new ArrayList<>();
        for(String skill: skillNames){
            Skills skills = new Skills();
            skills.setSkillName(skill);
            skillsList.add(skills);
        }
        skillRepository.saveAll(skillsList);
        System.out.println("Skills are added successfully");
        System.out.println("Adding Designation to the database");
        designationRepository.deleteAll();
        List<Designation> designationList = new ArrayList<>();
        for(String designation:designationNames ){
            Designation designationToBeAdded = new Designation();
            designationToBeAdded.setDesignationName(designation);
            designationList.add(designationToBeAdded);
        }
        designationRepository.saveAll(designationList);
        System.out.println("Designations are added successfully");
        System.out.println("Adding Practice to the database");
        practiceRepository.deleteAll();
        List<Practice> practiceList = new ArrayList<>();
        for(String practise: practiseNames){
            Practice practice = new Practice();
            practice.setPractiseName(practise);
            practiceList.add(practice);
        }
        practiceRepository.saveAll(practiceList);
        System.out.println("Practices are added successfully");
        System.out.println("Adding Employees to the database");
        employeeRepository.deleteAll();
        System.out.println("Adding 1st Employee");
        Employee adminEmployee = new Employee();
        adminEmployee.setEmail("kmadhav907@gmail.com");
        adminEmployee.setName("Admin");
        adminEmployee.setUpdateDateTime(LocalDateTime.now());
        adminEmployee.setCreatedAt(LocalDateTime.now());
        adminEmployee.setPhoneNumber("8197795213");
        adminEmployee.setPassword(encryption.encodePassword("12345"));
        adminEmployee.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.ADMIN).get().getDesignationId());
        adminEmployee.setGender("MALE");
        adminEmployee.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        adminEmployee.setRewardPoints(0L);
        adminEmployee.setNumberOfVotes(5L);
        employeeRepository.save(adminEmployee);
        System.out.println("Adding 2nd Employee");
        Employee tsmShreya = new Employee();
        tsmShreya.setEmail("shreyapatidar02@gmail.com");
        tsmShreya.setName("Shreya");
        tsmShreya.setUpdateDateTime(LocalDateTime.now());
        tsmShreya.setCreatedAt(LocalDateTime.now());
        tsmShreya.setPhoneNumber("123456789");
        tsmShreya.setPassword(encryption.encodePassword("12345"));
        tsmShreya.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.ASSOSCIATE_ENGINEER).get().getDesignationId());
        tsmShreya.setGender("FEMALE");
        tsmShreya.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        tsmShreya.setRewardPoints(0L);
        tsmShreya.setNumberOfVotes(5L);
        employeeRepository.save(tsmShreya);
        System.out.println("Adding 3rd Employee");
        Employee tsmJaideep = new Employee();
        tsmJaideep.setEmail("jai@gmail.com");
        tsmJaideep.setName("Jaideep");
        tsmJaideep.setUpdateDateTime(LocalDateTime.now());
        tsmJaideep.setCreatedAt(LocalDateTime.now());
        tsmJaideep.setPhoneNumber("123456789");
        tsmJaideep.setPassword(encryption.encodePassword("12345"));
        tsmJaideep.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.TECHNICAL_SERVICE_MANAGER).get().getDesignationId());
        tsmJaideep.setGender("MALE");
        tsmJaideep.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        tsmJaideep.setRewardPoints(0L);
        tsmJaideep.setNumberOfVotes(5L);
        employeeRepository.save(tsmJaideep);
        System.out.println("Adding 4th Employee");
        Employee aeParikshit = new Employee();
        aeParikshit.setEmail("parikshit@gmail.com");
        aeParikshit.setName("Parikshit");
        aeParikshit.setUpdateDateTime(LocalDateTime.now());
        aeParikshit.setCreatedAt(LocalDateTime.now());
        aeParikshit.setPhoneNumber("123456789");
        aeParikshit.setPassword(encryption.encodePassword("12345"));
        aeParikshit.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.ASSOSCIATE_ENGINEER).get().getDesignationId());
        aeParikshit.setGender("MALE");
        aeParikshit.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        aeParikshit.setRewardPoints(0L);
        aeParikshit.setNumberOfVotes(5L);
        employeeRepository.save(aeParikshit);
        System.out.println("Adding 5th Employee");
        Employee aeRahul = new Employee();
        aeRahul.setEmail("sharmarahul1729@gmail.com");
        aeRahul.setName("Rahul Sharma");
        aeRahul.setUpdateDateTime(LocalDateTime.now());
        aeRahul.setCreatedAt(LocalDateTime.now());
        aeRahul.setPhoneNumber("123456789");
        aeRahul.setPassword(encryption.encodePassword("12345"));
        aeRahul.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.ASSOSCIATE_ENGINEER).get().getDesignationId());
        aeRahul.setGender("MALE");
        aeRahul.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        aeRahul.setRewardPoints(0L);
        aeRahul.setNumberOfVotes(5L);
        employeeRepository.save(aeRahul);
        System.out.println("Adding 6th Employee");
        Employee aeSunidhi = new Employee();
        aeSunidhi.setEmail("sunidhihegde1999@gmail.com");
        aeSunidhi.setName("Sunidhi Hegde");
        aeSunidhi.setUpdateDateTime(LocalDateTime.now());
        aeSunidhi.setCreatedAt(LocalDateTime.now());
        aeSunidhi.setPhoneNumber("123456789");
        aeSunidhi.setPassword(encryption.encodePassword("12345"));
        aeSunidhi.setDesignationId(designationRepository.findByDesignationName(DesignationConstants.ASSOSCIATE_ENGINEER).get().getDesignationId());
        aeSunidhi.setGender("FEMALE");
        aeSunidhi.setPracticeId(practiceRepository.findByPractiseName(PracticeConstants.CD).get().getPractiseId());
        aeSunidhi.setRewardPoints(0L);
        aeSunidhi.setNumberOfVotes(5L);
        employeeRepository.save(aeSunidhi);
        System.out.println("Employee added Successfully");
//        System.out.println("Adding data to Winners");
//        winnerRepository.deleteAll();
//        for(String awardName: awardNames) {
//            Winner firstWinner = new Winner();
//            firstWinner.setAwardId(awardRepository.findByAwardName(awardName).get());
//        }
        System.out.println("Adding Awards");
        awardRepository.deleteAll();
        for(String awardName: awardNames){
            Award award = new Award();
            award.setAwardName(awardName);
            awardRepository.save(award);
        }
        System.out.println("Adding Awards successfully");
        System.out.println("Adding Winners data");
        winnerRepository.deleteAll();
        for(int i = 0; i < WinnersConstants.winnersAwards.size(); i++){
            Winner winner = new Winner();
            winner.setAwardId(awardRepository.findByAwardName(WinnersConstants.winnersAwards.get(i)).get().getAwardID());
            winner.setCreatedAt(LocalDateTime.now());
            winner.setEmployeeId(employeeRepository.findByEmail(WinnersConstants.winnersEmail.get(i)).get().getEmployeeId());
            winnerRepository.save(winner);
        }




    }
}
