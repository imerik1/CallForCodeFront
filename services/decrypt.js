import CryptoJS from "crypto-js";

export const decrypt = async (value, json) => {
  if (json) {
    return JSON.parse(
      CryptoJS.AES.decrypt(value, process.env.NEXT_PUBLIC_KEY_ENCRYPT).toString(
        CryptoJS.enc.Utf8
      )
    );
  }
  return CryptoJS.AES.decrypt(
    value,
    process.env.NEXT_PUBLIC_KEY_ENCRYPT
  ).toString(CryptoJS.enc.Utf8);
};
