package com.tekrewards.application.main.controllers;

import com.cloudinary.utils.ObjectUtils;
import com.tekrewards.application.main.constants.DesignationConstants;
import com.tekrewards.application.main.dto.*;
import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.pojo.AdminEmployeeInfo;
import com.tekrewards.application.main.pojo.EmployeeDetailsForVoting;
import com.tekrewards.application.main.pojo.EmployeeDetailsObject;
import com.tekrewards.application.main.pojo.ProfileDetailsObject;
import com.tekrewards.application.main.repositories.DesignationRepository;
import com.tekrewards.application.main.repositories.EmployeeRepository;
import com.tekrewards.application.main.repositories.PracticeRepository;
import com.tekrewards.application.main.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class EmployeeDetails {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DesignationRepository designationRepository;

    @Autowired
    private PracticeRepository practiceRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    @PersistenceContext
    private EntityManager entityManager;

    @RequestMapping(value = "/details/{email}", method = RequestMethod.GET)
    ResponseEntity<?> getEmployeeDetails(@PathVariable("email")String email){
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        if(employee.isPresent()){
            Employee employeeInDB = employee.get();
            String practiseName = practiceRepository.findById(employeeInDB.getPracticeId()).get().getPractiseName();
            String designationName = designationRepository.findById(employeeInDB.getDesignationId()).get().getDesignationName();
            EmployeeDetailsObject employeeDetailsObject = new EmployeeDetailsObject(designationName, employeeInDB.getName(),employeeInDB.getEmail(), practiseName, employeeInDB.getEmployeeId(), employeeInDB.getManagerId());
            EmployeeDetailsResponse employeeDetailsResponse = new EmployeeDetailsResponse("success", employeeDetailsObject);
            return ResponseEntity.ok(employeeDetailsResponse);
        }else {
            EmployeeDetailsResponse employeeDetailsResponse = new EmployeeDetailsResponse("error", "no user found");
            return ResponseEntity.status(404).body(employeeDetailsResponse);
        }
    }

    @RequestMapping(value = "/profile/{email}", method = RequestMethod.GET)
    ResponseEntity<?> getProfileDetails(@PathVariable("email")String email){
        Optional<Employee> employee = employeeRepository.findByEmail(email);
        if(employee.isPresent()){
            Employee employeeInDB = employee.get();
            String practiseName = practiceRepository.findById(employeeInDB.getPracticeId()).get().getPractiseName();
            String designationName = designationRepository.findById(employeeInDB.getDesignationId()).get().getDesignationName();
            String profilePic = employeeInDB.getProfilePic();
            ProfileDetailsObject profileDetailsObject = new ProfileDetailsObject(employeeInDB.getEmployeeId(), employeeInDB.getProjectManagerId(), employeeInDB.getName(), employeeInDB.getEmail(), employeeInDB.getPhoneNumber(), employeeInDB.getGender(), designationName, practiseName, profilePic);
            ProfileDetailsResponse profileDetailsResponse = new ProfileDetailsResponse("success", profileDetailsObject);
            return ResponseEntity.ok(profileDetailsResponse);
        }else {
            ProfileDetailsResponse profileDetailsResponse = new ProfileDetailsResponse("error", "no user found");
            return ResponseEntity.status(404).body(profileDetailsResponse);
        }
    }

    @RequestMapping(value="/updateProfile", method= RequestMethod.PUT)
    ResponseEntity<?> updateProfileDetails(@RequestBody UpdateProfileDetailsRequest updateProfileDetailsRequest){
        System.out.println(updateProfileDetailsRequest);
        Employee employee = employeeRepository.findById(updateProfileDetailsRequest.getId()).get();
        employee.setName(updateProfileDetailsRequest.getName());
        employee.setPhoneNumber(updateProfileDetailsRequest.getPhoneNumber());
        employee.setGender(updateProfileDetailsRequest.getGender());
        employee.setUpdateDateTime(LocalDateTime.now());
        employeeRepository.save(employee);
        System.out.println("Saved successfully");
        String designationName = designationRepository.findById(employee.getDesignationId()).get().getDesignationName();
        String practiseName = practiceRepository.findById(employee.getPracticeId()).get().getPractiseName();
        ProfileDetailsObject profileDetailsObject = new ProfileDetailsObject(employee.getEmployeeId(), employee.getManagerId(),employee.getName(),employee.getEmail(), employee.getPhoneNumber(), employee.getGender(), designationName, practiseName, employee.getProfilePic());
        UpdateProfileDetailsResponse updateProfileDetailsResponse = new UpdateProfileDetailsResponse("success", profileDetailsObject);
        return ResponseEntity.ok(updateProfileDetailsResponse);
    }
    @RequestMapping(value = "/uploadprofileimage", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file,@RequestParam("empId") Long empId ) throws IOException {
        System.out.println("File has been come");
        System.out.println(empId);
        try {
            Map results = cloudinaryService.upload(file.getBytes(), ObjectUtils.asMap("resourcetype", "auto"));
            Employee employee = employeeRepository.findById(empId).get();
            employee.setProfilePic(results.get("url").toString());
            employeeRepository.save(employee);
            UploadFileResponse uploadFileResponse = new UploadFileResponse();
            uploadFileResponse.setStatus("success");
            uploadFileResponse.setMessage("File uploaded successfully");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(uploadFileResponse);
        }catch (Exception e) {
            e.printStackTrace();
            UploadFileResponse uploadFileResponse = new UploadFileResponse();
            uploadFileResponse.setStatus("error");
            uploadFileResponse.setMessage("Cloudinary error");
            return ResponseEntity.status(500).body(uploadFileResponse);
        }


    }
    @RequestMapping(value="/manager/team/{managerId}", method = RequestMethod.GET)
    ResponseEntity<?> getEmployeeListUnderAManager(@PathVariable("managerId") Long managerId) {
        List<Employee> employeeList = employeeRepository.findByManagerId(managerId);
        List<EmployeeDetailsForVoting> employeeDTOList = new ArrayList<>();
        for(Employee employee: employeeList) {
            String designationName = designationRepository.findById(employee.getDesignationId()).get().getDesignationName();
            String employeeName = employee.getName();
            String employeeEmail = employee.getEmail();
           EmployeeDetailsForVoting employeeDTO = new EmployeeDetailsForVoting(designationName, employeeName, employeeEmail, employee.getEmployeeId());
            employeeDTOList.add(employeeDTO);
        }
        EmployeeDetailsResponse employeeDetailsResponse = new EmployeeDetailsResponse("success", employeeDTOList);
        return  ResponseEntity.ok(employeeDetailsResponse);
    }
    @RequestMapping(value="/admin/employees", method = RequestMethod.GET)
    public ResponseEntity<?> getMasterListForEmployee(Pageable pageable){
            Page<Employee> employeeList = employeeRepository.findAll(pageable);

            List<Employee> employees = employeeList.getContent();

            AdminEmployeeResponse adminEmployeeResponse = new AdminEmployeeResponse();
            List<AdminEmployeeInfo> adminEmployeeInfoList = new ArrayList<>();

            for(Employee employee: employees){
                System.out.println(employee.toString());
                AdminEmployeeInfo adminEmployeeInfo = new AdminEmployeeInfo();
                adminEmployeeInfo.setEmployeeId(employee.getEmployeeId());
                adminEmployeeInfo.setEmployeeEmail(employee.getEmail());
                adminEmployeeInfo.setEmployeeName(employee.getName());
                adminEmployeeInfo.setPractiseName(practiceRepository.findById(employee.getPracticeId()).get().getPractiseName());

                adminEmployeeInfoList.add(adminEmployeeInfo);
            }
            adminEmployeeResponse.setStatus("success");
            adminEmployeeResponse.setEmployeeList(adminEmployeeInfoList);
            adminEmployeeResponse.setTotalNumberOfEmployees(employeeList.getTotalElements());
            return  ResponseEntity.ok(adminEmployeeResponse);

    }
    @RequestMapping(value = "/admin/managers" , method = RequestMethod.GET)
    public ResponseEntity<?> getManagerList() {

        List<Employee> employeeList = employeeRepository.findByDesignationId(
                designationRepository.
                        findByDesignationName(DesignationConstants.TECHNICAL_SERVICE_MANAGER).get()
                        .getDesignationId());
        EmployeeDetailsResponse employeeDetails = new EmployeeDetailsResponse("success", employeeList);
        return ResponseEntity.ok(employeeDetails);
    }


//    @RequestMapping(value = "/rewardList" , method = RequestMethod.GET)
//    public ResponseEntity<?> getRewardList() {
//        List<Employee> rewardList = employeeRepository.findAll(Sort.by(Sort.Direction.DESC,"rewardPoints"));
////        List<Employee> rewardList = employeeRepository.findRewardPoints();
//
//        EmployeeDetailsResponse rewardDetails = new EmployeeDetailsResponse("success", rewardList);
//        return ResponseEntity.ok(rewardDetails);
//
////        int limit=3;
////        return (ResponseEntity<?>) entityManager.createQuery("select reward_points from Employee ",Employee.class).setMaxResults(limit).getResultList();
//        }


    @RequestMapping(value = "/manager/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getManagerName(@PathVariable("id") Long managerId){
        ManagerName managerName = new ManagerName();
        managerName.setStatus("success");
        managerName.setName(employeeRepository.findById(managerId).get().getName());
        return ResponseEntity.ok(managerName);
    }

    @RequestMapping(value= "/admin/updateProflie/{managerName}/{employeeId}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUserByAdmin(@PathVariable("managerName") String managerName, @PathVariable("employeeId") Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).get();
        employee.setManagerId(employeeRepository.findByName(managerName).get().getEmployeeId());
        employee.setUpdateDateTime(LocalDateTime.now());
        employeeRepository.save(employee);
        UpdateAdminResponse updateAdminResponse = new UpdateAdminResponse();
        updateAdminResponse.setData("Updated successfully");
        updateAdminResponse.setStatus("success");
        return ResponseEntity.ok(updateAdminResponse);
    }
    @RequestMapping(value = "/reward-list", method = RequestMethod.GET)
    public ResponseEntity<?> getRewardList() {
        List<Employee> rewardList = employeeRepository.findTop3ByOrderByRewardPointsDesc();
        List<EmployeeDetailsObject> employeeDetailsObjects = new ArrayList<>();
        for(Employee employee: rewardList) {
            EmployeeDetailsObject employeeDetailsObject = new EmployeeDetailsObject();
            employeeDetailsObject.setDesignation(designationRepository.findById(employee.getDesignationId()).get().getDesignationName());
            employeeDetailsObject.setEmail(employee.getEmail());
            employeeDetailsObject.setName(employee.getName());
            employeeDetailsObject.setId(employee.getEmployeeId());
            employeeDetailsObject.setManagerId(employee.getManagerId());
            employeeDetailsObjects.add(employeeDetailsObject);
        }
        EmployeeDetailsResponse rewardDetails = new EmployeeDetailsResponse("success", employeeDetailsObjects);
        return ResponseEntity.ok(rewardDetails);
//        int limit=3;
//        return (ResponseEntity<?>) entityManager.createQuery("select reward_points from Employee ",Employee.class).setMaxResults(limit).getResultList();
    }
}
