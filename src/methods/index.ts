import { IncomingMessage, ServerResponse } from "http";

export const getMethods = (
  method: string,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  switch (method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;

    default:
      break;
  }
};
