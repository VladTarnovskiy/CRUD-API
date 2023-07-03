import { IncomingMessage, ServerResponse } from "http";
import { getUrlParams, getUrlPathname, parseUrl } from "../utils/urlMethods";
import { validate } from "uuid";
import { parseResponse } from "../utils/parseResponse";
import { parseData } from "../utils/parseData";
import { User } from "../interfaces";
import { isDataValid } from "../utils/isDataValid";
import { getUserID } from "../utils/getUserID";
import { createRequire } from "module";
import { addDataToUsers } from "../utils/addDataToUsers";
const require = createRequire(import.meta.url);
let data: User[] = require("../data.json");

const usersEndpoints = "/api/users";
const existUserError = { message: "User doesn't exist!" };
const requestError = { message: "Invalid request!" };
const dataError = { message: "Invalid input data!" };
const idError = { message: "Invalid uuid!" };

export const getRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const url = parseUrl(req);
  const pathname = getUrlPathname(url);
  const params = getUrlParams(url);
  if (req.url === usersEndpoints) {
    parseResponse(200, data, res);
  } else if (pathname === usersEndpoints && params.id) {
    const filteredData = data.filter((user: User) => user.id === params.id);
    if (!validate(params.id)) {
      parseResponse(400, idError, res);
    } else if (filteredData.length > 0) {
      parseResponse(200, filteredData, res);
    } else {
      parseResponse(404, existUserError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};

export const postRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  if (req.url === usersEndpoints) {
    const userData: any = await parseData(req);
    if (isDataValid(userData)) {
      getUserID(userData);
      data.push(userData);
      addDataToUsers(data);
      parseResponse(200, userData, res);
    } else {
      parseResponse(404, dataError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};

export const putRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const url = parseUrl(req);
  const pathname = getUrlPathname(url);
  const params = getUrlParams(url);
  if (pathname === usersEndpoints && params.id) {
    const filteredData = data.filter((user: User) => user.id === params.id);
    const requestData: any = await parseData(req);
    if (isDataValid(requestData)) {
      if (filteredData.length > 0) {
        const updatedUsers = data.map((user) => {
          if (user.id === params.id) {
            user = { ...requestData, id: params.id };
          }
          return user;
        });
        data = updatedUsers;
        addDataToUsers(data);
        parseResponse(200, data, res);
      } else {
        parseResponse(404, existUserError, res);
      }
    } else {
      parseResponse(404, dataError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};

export const deleteRequest = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const url = parseUrl(req);
  const pathname = getUrlPathname(url);
  const params = getUrlParams(url);
  if (pathname === usersEndpoints && params.id) {
    const filteredData = data.filter((user: User) => user.id !== params.id);
    if (validate(params.id)) {
      if (filteredData.length !== data.length) {
        data = filteredData;
        addDataToUsers(data);
        parseResponse(204, data, res);
      } else {
        parseResponse(404, existUserError, res);
      }
    } else {
      parseResponse(400, idError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};
