import CryptoJS from "crypto-js";

export const encrypt = async (value, json) => {
  if (json) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value).toString(),
      process.env.NEXT_PUBLIC_KEY_ENCRYPT
    ).toString();
  }
  return CryptoJS.AES.encrypt(
    value,
    process.env.NEXT_PUBLIC_KEY_ENCRYPT
  ).toString();
};
