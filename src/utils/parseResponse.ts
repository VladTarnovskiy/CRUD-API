import { IncomingMessage, ServerResponse } from "http";
import { User } from "../interfaces";
import { ErrorMessage } from "../interfaces";

export const parseResponse = (
  statusCode: number,
  data: User[] | ErrorMessage,
  res: ServerResponse<IncomingMessage>
) => {
  res.writeHead(statusCode, {
    "Content-type": "application/json",
  });
  return res.end(JSON.stringify(data));
};
