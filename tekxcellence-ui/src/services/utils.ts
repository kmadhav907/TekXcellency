import { ENDPOINT } from "../end-point";

const callAndReturn = (endPoint: string, options:any):Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(ENDPOINT + endPoint, options).then((response)=> response.json()).then((response)=>{
            if(response.status === "success") {
                resolve(response)
            }else {
                reject(response);
            }
        })
    })
}
export default callAndReturn;