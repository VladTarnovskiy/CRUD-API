import { User } from "../interfaces";

export const isDataValid = (data: User) => {
  const bodyKeysArr = Object.keys(data);
  if (
    bodyKeysArr.includes("username") &&
    bodyKeysArr.includes("age") &&
    bodyKeysArr.includes("hobbies")
  ) {
    return true;
  }
  return false;
};
