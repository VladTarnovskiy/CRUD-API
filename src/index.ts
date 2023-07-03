import * as dotenv from "dotenv";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 4001;
const serverError = { message: "Internal Server Error" };

const server = http.createServer((req, res) => {
  try {
    // methods[req.method || 'GET'](req, res);
  } catch {
    // parseJson(500, serverError, req, res);s
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

process.on("SIGINT", async () => {
  //   await clearDataFile();
  server.close(() => process.exit());
});
