import { EMPLOYEELOGIN, GETEMPLOYEEDETAILS, GETEMPLOYEEUNDERAMANAGER, GETPROFILEDETAILS, SENDFORGOTPASSWORDMAIL, UPDATEPROFILEDETAILS, UPLOADPROFILEIMAGE, VERIFYTOKEN } from "../end-point";
import callAndReturn from "./utils";


export const employeeSignUp = (userEmail: string, password: string):Promise<any>=> {
    const token = localStorage.getItem("token");
    const data = {email: userEmail, password: password}
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
      };
    return callAndReturn(EMPLOYEELOGIN, options)
}

export const getEmployeeDetails = (userEmail: string):Promise<any> => {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  };
return  callAndReturn(`${GETEMPLOYEEDETAILS}/${userEmail}`, options)
}

export const getProfileDetails = (userEmail: string):Promise<any> => {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  
  };
  return  callAndReturn(`${GETPROFILEDETAILS}/${userEmail}`, options);
}

export const updateProfileDetails = (id : number, phoneNumber:string, name: string, gender:string) : Promise<any> => {
  const token = localStorage.getItem("token");
  const data = {id: id, phoneNumber: phoneNumber, name:name, gender:gender};
  const options = {
    method: "PUT",
    headers:{
      "Content-Type":"application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  };
  return callAndReturn(`${UPDATEPROFILEDETAILS}`, options);
}

export const getEmployeesUnderAManager = (managerId: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  
  };
  return callAndReturn(`${GETEMPLOYEEUNDERAMANAGER}/${managerId}`,options);
}

export const sendForgotPasswordMail = (email: string)=> {
  const token = localStorage.getItem('token');
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
  }
  return callAndReturn(`${SENDFORGOTPASSWORDMAIL}?email=${email}`, options)
}

export const validateToken = (token: string)=> {
  const beaerToken = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + beaerToken
    },
    body: "Bearer " + token,
  }
  return callAndReturn(VERIFYTOKEN, options);
}

export const uploadImageFile = (data:FormData)=> {
  const token = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token
    },
    body: data
  }
  return callAndReturn(UPLOADPROFILEIMAGE, options);
}