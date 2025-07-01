import { config } from "dotenv";

// Load environment variables from .env file
config({ path: `.env` });

// Export the environment variables
export const { PORT, NODE_ENV } = process.env;