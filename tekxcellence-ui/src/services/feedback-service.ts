import { GETFEEDBACK, GETFEEDBACKFORADMIN } from "../end-point";
import callAndReturn from "./utils";


export const getAllFeedback = (currentPageFeedback:number,feedbackPerPage:number):Promise<any>=> {
    const token = localStorage.getItem('token');
    const options = {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
}
    }
    return callAndReturn(`${GETFEEDBACKFORADMIN}?page=${currentPageFeedback}&size=${feedbackPerPage}`,options);
}