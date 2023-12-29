import * as dotenv from "dotenv";

import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

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

const POSTGRES_URL = `postgres://${POSTGRES_USER}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

console.log(`Connecting to ${POSTGRES_URL}`);

export const client = postgres(
	`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
	{
		password: POSTGRES_PASSWORD,
	}
);
export const db: PostgresJsDatabase = drizzle(client);
