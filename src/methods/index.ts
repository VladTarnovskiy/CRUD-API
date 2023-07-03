import { IncomingMessage, ServerResponse } from "http";
import { deleteRequest, getRequest, putRequest } from "./methods";
import { postRequest } from "./methods";

export const getMethods = (
  method: string,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  switch (method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "PUT":
      putRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    default:
      break;
  }
};
