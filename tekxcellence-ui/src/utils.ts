import * as CryptoJS from 'crypto-js';
const KEY = "some-random-key"
export const encryptData = (data: string):string => {
    return CryptoJS.AES.encrypt(data, KEY).toString();
}


export const decryptData = (data: string):string => {
    return CryptoJS.AES.decrypt(data, KEY).toString();
}

export const checkEmail = (email: string): boolean => {
    const re = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return re.test(email);
  };
export const APPPASSWORD = "password";
export const APPUSERNAME = "username";

