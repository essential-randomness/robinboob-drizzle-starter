import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";
dotenv.config({
	path: ".env.development",
});

const {
	POSTGRES_PASSWORD,
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PORT,
} = process.env;

const POSTGRES_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default {
	schema: "./db/schema/index.ts",
	out: "./db/migrations",
	driver: "pg",
	dbCredentials: {
		connectionString: POSTGRES_URL,
	},
} satisfies Config;
