import { AnyColumn, InferColumnsDataTypes, eq, sql } from "drizzle-orm";

export function jsonBuildArrayObject<T extends Record<string, AnyColumn>>(
	shape: T
) {
	const objectMapping = sql.join(
		Object.entries(shape).map(([key, value]) => {
			return sql`'${sql.raw(key)}', ${value}`;
		}),
		sql`, `
	);

	return sql<
		InferColumnsDataTypes<T>[]
	>`json_agg(json_build_object(${objectMapping}))`;
}
