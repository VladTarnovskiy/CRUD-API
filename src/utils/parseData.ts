import { IncomingMessage } from "http";

export const parseData = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          resolve(JSON.parse(body));
        }
        resolve("");
      });
    } catch (err) {
      reject(err);
      throw new Error();
    }
  });
};
