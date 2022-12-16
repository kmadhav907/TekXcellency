import { REGISTRATION} from "../end-point";

import callAndReturn from "./utils";

export const employeeRegistration = (firstname: string ,gender:string,phonenumber:string,email:string,username:string, password:string ) => {

    const token = localStorage.getItem("token");

    const data = {firstname: firstname,gender:gender,phonenumber:phonenumber,email:email,username:username, password: password}

    const options = {
        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: "Bearer " + token

        },

        body: JSON.stringify(data)

      };

    return callAndReturn(REGISTRATION, options)

  }