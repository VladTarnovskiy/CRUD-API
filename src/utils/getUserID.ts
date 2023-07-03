import { v4 as uuidv4 } from "uuid";
import { User } from "../interfaces";

export const getUserID = (user: User) => {
  user.id = uuidv4();
};
