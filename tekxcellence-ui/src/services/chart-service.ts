import { GETCHARTDETAILS } from "../end-point";
import callAndReturn from "./utils";

export const getChartData = ()=> {
    const token = localStorage.getItem('token');
    const options = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
}
    }
    return callAndReturn(GETCHARTDETAILS,options);
}