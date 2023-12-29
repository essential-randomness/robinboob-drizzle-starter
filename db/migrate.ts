import { db } from "./pool";
import { migrate } from "drizzle-orm/postgres-js/migrator";

await migrate(db, { migrationsFolder: "db/migrations" });

// TODO: see https://github.com/drizzle-team/drizzle-orm/issues/1222
process.exit();
