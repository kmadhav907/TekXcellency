import { ADDAWARD, DELETEAWARD, GETAWARDDETAILS, GETAWARDS, UPDATEAWARD } from "../end-point";
import callAndReturn from "./utils";

export const getAwardDetails = (awardName : string):Promise<any> => {
    const token = localStorage.getItem("token");
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    return callAndReturn(`${GETAWARDDETAILS}/${awardName}`, options);
}

export const getAwards = ():Promise<any> => {
    const token = localStorage.getItem("token");
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    };
    return callAndReturn(`${GETAWARDS}`, options);
}

export const addAward = (
    awardName : string,
    awardBriefDescription : string,
    awardMainDescription : string
    )  => {
        const token = localStorage.getItem("token");
        const data = JSON.stringify({
            awardName : awardName,
            awardBriefDescription : awardBriefDescription,
            awardMainDescription : awardMainDescription,
        });
        const options = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : "Bearer " + token,
            },
            body : data
        };
    return callAndReturn(ADDAWARD, options);
}

export const updateAward = (
    awardID : number,
    awardName : string,
    awardBriefDescription : string,
    awardMainDescription : string
) : Promise<any> => {
    const token = localStorage.getItem("token");
    const data = JSON.stringify({
        awardId : awardID,
        awardName : awardName,
        awardBriefDescription : awardBriefDescription,
        awardMainDescription : awardMainDescription, 
    });
    const options = {
        method: "PUT",
        headers : {
            "Content-Type":"application/json",
            Authorization : "Bearer " + token
        },
        body: data
    };
    return callAndReturn(UPDATEAWARD, options)
}
 
export const deleteAward = (awardId:number):Promise<any> => {
    const token = localStorage.getItem("token");
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    };
    return callAndReturn(`${DELETEAWARD}/${awardId}`, options);
}