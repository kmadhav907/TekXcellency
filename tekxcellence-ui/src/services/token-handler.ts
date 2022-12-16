import { AUTHENTICATE, ENDPOINT } from "../end-point";
import { APPPASSWORD, APPUSERNAME } from "../utils";

const getToken = ():Promise<String>=> {
    const data = {
        username: APPUSERNAME,
        password: APPPASSWORD
    }
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
    return new Promise((resolve, reject) => {
        fetch(ENDPOINT + AUTHENTICATE, options).then((response) => response.json()).then((response:any)=> {
            if(response.token){
                localStorage.setItem("token", response.token);
                resolve(response)
            }
            else {
                alert("Something went wrong");
                reject("Error fetching token");
            }
      
        })

    })
}
export default getToken;