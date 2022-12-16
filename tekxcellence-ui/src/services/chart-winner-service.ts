import { GETWINNERSFORCHART } from "../end-point";
import callAndReturn from "./utils";


export const getWinnersDataForChart = (id: number):Promise<any> => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
    };
  return  callAndReturn(`${GETWINNERSFORCHART}/${id}`, options)
  }