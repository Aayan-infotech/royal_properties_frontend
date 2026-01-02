export const type = location.pathname.split("/")[1];
import CryptoJS from "crypto-js";
import { AES } from "crypto-js";
const secretKey = "RoyalPropertyKey";

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
