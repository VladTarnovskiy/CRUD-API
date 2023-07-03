import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
dotenv.config();

interface UrlParams {
  [key: string]: string;
}
const PORT = process.env.PORT;
const baseUrl = `http://localhost:${PORT}/`;

export const parseUrl = (
  //   baseUrl: string | URL,
  req: IncomingMessage
  // res: ServerResponse<IncomingMessage>
) => {
  const parsedUrl = new URL(req.url || "", baseUrl);
  return parsedUrl;
};

export const getUrlPathname = (parsedUrl: URL) => {
  return parsedUrl.pathname;
};

export const getUrlParams = (parsedUrl: URL) => {
  const params: UrlParams = {};
  parsedUrl.searchParams.forEach((value, key) => (params[key] = value));
  return params;
};
