import { config } from "dotenv";
import { join } from "path";

config();

export const PORT = +process.env.PORT || 8080;
export const FILENAME_DATABASE = join(__dirname, "products.json");