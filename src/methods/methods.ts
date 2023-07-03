import { IncomingMessage, ServerResponse } from "http";
import { getUrlParams, getUrlPathname, parseUrl } from "../utils/urlMethods";
import { data } from "../data";
import { parseResponse } from "../utils/parseResponse";
import { parseData } from "../utils/parseData";
import { User } from "../interfaces";

const usersEndpoints = "/api/users";
const existUserError = { message: "User doesn't exist!" };
const requestError = { message: "Invalid request!" };

export const getRequest = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  const url = parseUrl(req, res);
  const pathname = getUrlPathname(url);
  const params = getUrlParams(url);
  if (req.url === usersEndpoints) {
    console.log(data);
    parseResponse(200, data, res);
  } else if (pathname === usersEndpoints && params.id) {
    const filteredData = data.filter((user: User) => user.id === params.id);
    if (filteredData.length > 0) {
      parseResponse(200, filteredData, res);
    } else {
      parseResponse(404, existUserError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
};
