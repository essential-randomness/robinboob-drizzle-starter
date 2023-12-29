import dotenv from "dotenv";
import { glob } from "glob";
import { stripIndent } from "common-tags";

dotenv.config({
	path: "./.env.development",
});

const paths = await glob("./db/seed/data/*.ts");
console.log(`Seeding from files: [${paths.join(", ")}]`);

// Import all paths
for (const path of paths) {
	console.log(`Loading ${path}`);
	await import(path);
}

console.log(stripIndent`
    **********
    **********
    **********
    **********
    Loaded seed data from ${paths.length} files.

    You can now use the database.

    To open the app go to http://localhost:3000/ in your browser.

    **********
    **********
    **********
    **********`);

process.exit();
