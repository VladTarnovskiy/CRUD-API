import { writeFile } from "node:fs/promises";
import { User } from "../interfaces";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addDataToUsers = async (data: User[]) => {
  const path = join(__dirname, "../", "data.json");
  try {
    await writeFile(path, JSON.stringify(data));
  } catch (err) {
    throw new Error();
  }
};
