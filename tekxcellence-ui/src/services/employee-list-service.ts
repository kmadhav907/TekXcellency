import { GETEMPLOYEEDETAILSFORADMIN, GETMANAGERLIST, GETMANAGERNAME, GETTOPEMPLOYEEWITHREWARDPOINTS, UPDATEPROFILEBYADMIN } from "../end-point"
import callAndReturn from "./utils"


export const getAllEmployeeFromMaster = (currentPage: number, perPageEmployees: number) => {
    const token = localStorage.getItem("token")
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    }
    return callAndReturn(`${GETEMPLOYEEDETAILSFORADMIN}?page=${currentPage}&size=${perPageEmployees}`, options);
}
export const getManagerList = ()=> {
    const token = localStorage.getItem("token")
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    }
    return callAndReturn(GETMANAGERLIST, options);
}
export const getManagerName = (managerId: number)=> {
    const token = localStorage.getItem("token")
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    }
    return callAndReturn(GETMANAGERNAME + "/"+managerId.toString(), options);
}

export const updateUserDetailsForAdmin = (managerName: string, employeeId: number)=> {
    const token = localStorage.getItem("token");
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        }
    }
    return callAndReturn(`${UPDATEPROFILEBYADMIN}/${managerName}/${employeeId}`, options);
}
export const getEmployeeWithHighestRewardPoints = ()=> {
    const token = localStorage.getItem("token")
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    }
    return callAndReturn(GETTOPEMPLOYEEWITHREWARDPOINTS, options);
}