package com.tekrewards.application.main.schedulers;

import com.tekrewards.application.main.constants.DesignationConstants;
import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.pojo.MailObject;
import com.tekrewards.application.main.repositories.DesignationRepository;
import com.tekrewards.application.main.repositories.EmployeeRepository;
import com.tekrewards.application.main.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class Schedulers {

    @Autowired
    private MailService service;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DesignationRepository designationRepository;

//    0 0 1 * *
    // @Scheduled(cron = "* * * * * *")
    public void calculateWinner() throws MessagingException {
//        MailObject mailObject = new MailObject();
//        mailObject.setFrom("kmadhav907@gmail.com");
//        mailObject.setTo("shreyapatidar02@gmail.com");
//       // mailObject.setTo("rdmdev01@gmail.com");
//        mailObject.setSubject("Congrats,You have won Spot Award!");
//        mailObject.setTemplateName("winners");
//        Map<String , Object> properties = new HashMap<>();
//        properties.put("name", "shreya");
//        mailObject.setProperties(properties);
//
//        try {
//            service.sendWelcomeMail(mailObject);
//        }catch (Exception e){
//            e.printStackTrace();
//        }

    }
//    @Scheduled(cron = "0 0 0 1 */3 *")
//    @Scheduled(cron = "* * * * * *")
    public void sendVoteNotificationEmail() throws  MessagingException {
        List<Employee> employeeList = employeeRepository.findByDesignationId(designationRepository.findByDesignationName(DesignationConstants.ASSOSCIATE_ENGINEER).get().getDesignationId());

        for(Employee employee: employeeList) {
            MailObject mailObject = new MailObject();
            mailObject.setTo(employee.getEmail());
            mailObject.setSubject("Voting notification");
            mailObject.setTemplateName("voteNotification");
            mailObject.setFrom("kmadhav907@gmail.com");
            Map<String, Object> properties = new HashMap<>();
            properties.put("name", employee.getName());

            mailObject.setProperties(properties);
            try {
                service.sendVoteNotificationMail(mailObject);

                System.out.println("Mail sent");
            }catch (Exception e){
                e.printStackTrace();;

            }

        }

    }
}
