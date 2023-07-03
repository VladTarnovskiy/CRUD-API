import * as dotenv from "dotenv";
import http from "http";
import { getMethods } from "./methods";
import { parseResponse } from "./utils/parseResponse";

dotenv.config();

const PORT = process.env.PORT || 4001;
const serverError = { message: "Server Error" };

const server = http.createServer((req, res) => {
  try {
    getMethods(req.method || "GET", req, res);
  } catch {
    parseResponse(500, serverError, res);
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

process.on("SIGINT", async () => {
  //   await clearDataFile();
  server.close(() => process.exit());
});
