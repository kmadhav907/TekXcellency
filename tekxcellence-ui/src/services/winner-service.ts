import { GETWINNERSFORADMIN, SUBMITWINNER } from "../end-point";
import callAndReturn from "./utils";

// export const submitWinner = (awardId : number) => {
//     const token = localStorage.getItem("token");
//     const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//     };
//     return callAndReturn(SUBMITWINNER+"/"+awardId, options);
// }

export const submitWinner = (
  awardId : number,
  employeeName : string,
  pointsGained : number,
  ) => {
  const token = localStorage.getItem("token");
  const data = JSON.stringify({
    employeeName:employeeName,
    pointsGained:pointsGained
  });
  const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body : data,
  };
  return callAndReturn(SUBMITWINNER+"/"+awardId, options);
}

export const getWinnersAdmin = (awardId:number) : Promise<any> => {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return callAndReturn(`${GETWINNERSFORADMIN}/${awardId}`, options);
}