import { EMPLOYEEPRACTISES } from "../end-point";
import callAndReturn from "./utils";


export const getAllPractises = ():Promise<any>=> {
    const token = localStorage.getItem('token');
    const options = {
method: "GET",
headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
}
    }
    return callAndReturn(EMPLOYEEPRACTISES,options);
}