import {
  integer,
  bigint,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  ao3_id: bigint("ao3_id", {
    mode: "number",
  })
    .notNull()
    .unique(),
  name: text("name").notNull(),
});

export const characters_to_canonical = pgTable("characters_to_canonical", {
  id: serial("id").primaryKey(),
  character_id: serial("character_id").references(() => characters.id),
  canonical_id: serial("canonical_id").references(() => characters.id),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull().unique(),
  image_url: text("image_url").notNull(),
});

export const certificate_characters = pgTable(
  "certificate_characters",
  {
    id: serial("id").primaryKey(),
    certificate_id: serial("certificate_id").references(() => certificates.id),
    character_id: serial("character_id").references(() => characters.id),
    position: integer("position").notNull(),
    image_url: text("image_url").notNull(),
  },
  (table) => ({
    unique_certificate_position: unique("unique_certificate_position").on(
      table.certificate_id,
      table.position
    ),
  })
);

export const purchases = pgTable("purchases", {
  id: serial("id").primaryKey(),
  certificate_id: serial("certificate_id").references(() => certificates.id),
  stripe_id: text("stripe_id"),
  paypal_id: text("paypal_id"),
});
