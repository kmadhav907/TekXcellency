package com.tekrewards.application.main.controllers;

import com.tekrewards.application.main.dto.EmployeeDetailsResponse;
import com.tekrewards.application.main.dto.LoginRequest;
import com.tekrewards.application.main.dto.LoginResponse;
import com.tekrewards.application.main.dto.RegistrationResponse;
import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.models.EmployeeRegistration;
import com.tekrewards.application.main.pojo.MailObject;
import com.tekrewards.application.main.repositories.EmployeeRepository;
import com.tekrewards.application.main.repositories.RegistrationRepository;
import com.tekrewards.application.main.services.MailService;
import com.tekrewards.application.main.utility.Encryption;
import com.tekrewards.application.main.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class EmployeeLoginRegistration {

    @Autowired
    private Encryption encoder;


    @Autowired
    private MailService mailService;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${origin.request.url}")
    private String originOfClient;
    @Autowired
    JwtUtil jwtUtil;
    @RequestMapping(value="/login", method = RequestMethod.POST)
    public ResponseEntity<?> loginEmployee(@RequestBody LoginRequest loginRequest) throws  Exception {
        Optional<Employee> employee = employeeRepository.findByEmail(loginRequest.getEmail());
        if(employee.isPresent()){
            Employee employeeFromDB = employee.get();
            System.out.println(employeeFromDB.toString());
            if(encoder.decodePassword(loginRequest.getPassword(), employeeFromDB.getPassword())){
                LoginResponse loginResponse = new LoginResponse("success",employeeFromDB.getEmail());
                return ResponseEntity.ok(loginResponse);
            }
            else {
                LoginResponse loginResponse = new LoginResponse("error","invalid credentials");
                return ResponseEntity.status(403).body(loginResponse);
            }
        }
        else {
            LoginResponse loginResponse = new LoginResponse("error","invalid credentials");
            return ResponseEntity.status(403).body(loginResponse);
        }
    }
    @RequestMapping(value = "/forgotpassword", method = RequestMethod.POST)
    public ResponseEntity<?> sendForgotPasswordMail(HttpServletRequest request, @RequestParam("email") String email){
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        System.out.println(ServletUriComponentsBuilder.fromRequest(request).replacePath(null).build().toUriString());
        if(employee.isPresent()){
            Employee employeeInDB = employee.get();
            String jwtTokenGenerated = jwtUtil.generateResetPasswordToken(employeeInDB.getEmail());


            String resetPasswordLinkWithToken = originOfClient + "/" + "confirmation/"+ jwtTokenGenerated;
            try {
                MailObject mailObject = new MailObject();
                Map<String , Object>  propertiesForMail = new HashMap<>();
                propertiesForMail.put("urlForOrigin", resetPasswordLinkWithToken);
                mailObject.setProperties(propertiesForMail);
                mailObject.setSubject("Did you forget the password?");
                mailObject.setFrom(fromEmail);
                mailObject.setTo(employeeInDB.getEmail());
                mailObject.setTemplateName("forgotPassword");
                mailService.sendForgotPasswordMail(mailObject);
                return ResponseEntity.ok(new LoginResponse("success", "Mail sent"));

            }catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body(new LoginResponse("error", "SMTP error"));
            }
        }
        else {
            return ResponseEntity.status(404).body(new LoginResponse("error", "Not found email"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> createemployee (@RequestBody EmployeeRegistration employee) throws Exception
    {
        EmployeeRegistration emp = registrationRepository.findByemail(employee.getEmail());
        if (emp != null) throw new RuntimeException("Record already exists");
        registrationRepository.save(employee);
        RegistrationResponse status = new RegistrationResponse("success", "registration successful");
        return ResponseEntity.ok(status);


    }
    @RequestMapping(value = "/resetPasswordToken", method = RequestMethod.POST)
    public ResponseEntity<?> validateResetPasswordToken(@RequestBody String token){
        String generatedNewToken = token.replace("Bearer", "");
        String emailOfAnEmployee = jwtUtil.getSubjectsFromResetPasswordToken(generatedNewToken);
        if(emailOfAnEmployee == null){
            return ResponseEntity.status(403).body(new LoginResponse("error", "invalid token"));
        }
        else {
            System.out.println(emailOfAnEmployee);
            return ResponseEntity.ok(new LoginResponse("success", "password set successfully"));
        }
    }
    @RequestMapping(value = "/addEmployee", method = RequestMethod.POST)
    public ResponseEntity<?> addEmployee() {
//        Employee employee = new Employee();
//        employee.setEmail("kmadhav907@gmail.com");
//        employee.setManagerId();
//        employeeRepository.save(employee);
        return ResponseEntity.ok("success");
    }
}
