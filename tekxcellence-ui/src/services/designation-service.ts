import { EMPLOYEEDESIGNATIONS } from "../end-point";
import callAndReturn from "./utils";

export const getAllDesigations = (): Promise<any> => {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return callAndReturn(EMPLOYEEDESIGNATIONS, options);
};
