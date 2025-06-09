import CryptoJs from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.AES_SECRET_KEY || 'myDefaultSecretKey123';

export const encryptMessage = (message) => {
  return CryptoJs.AES.encrypt(
    message,
    SECRET_KEY
  ).toString();
};

export const decryptMessage = (encrypted) => {
  const bytes = CryptoJs.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJs.enc.Utf8); 
};
