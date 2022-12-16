import { GETSKILLLIST } from "../end-point";
import callAndReturn from "./utils";

export const getSkillsList = ()=> {
    const token = localStorage.getItem('token');
    const options = {
method: "GET",
headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
}
    }
    return callAndReturn(GETSKILLLIST,options);
}