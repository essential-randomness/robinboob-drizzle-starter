import { characters, characters_to_canonical } from "db/schema";

import { db } from "db/pool";
import { eq } from "drizzle-orm";

const samWinchester = (
  await db
    .insert(characters)
    .values({
      ao3_id: 25,
      name: "Sam Winchester",
    })
    .returning({ id: characters.id })
    .execute()
)[0];

await db.insert(characters_to_canonical).values({
  character_id: samWinchester.id,
  canonical_id: samWinchester.id,
});

const samWinchesters = await db
  .insert(characters)
  .values([
    {
      ao3_id: 71058,
      name: "girl!Sam Winchester",
    },
    {
      ao3_id: 121924,
      name: "sammy winchester",
    },
    {
      ao3_id: 216786,
      name: "Redacted",
    },
    {
      ao3_id: 231589,
      name: "Soulless!Sam Winchester",
    },
  ])
  .returning({ id: characters.id })
  .execute();

for (const nonCanonicalSamWinchester of samWinchesters) {
  console.log(nonCanonicalSamWinchester);
  await db.insert(characters_to_canonical).values({
    character_id: nonCanonicalSamWinchester.id,
    canonical_id: samWinchester.id,
  });
}

const deanWinchester = (
  await db
    .insert(characters)
    .values({
      ao3_id: 26,
      name: "Dean Winchester",
    })
    .returning({ id: characters.id })
    .execute()
)[0];

await db.insert(characters_to_canonical).values({
  character_id: deanWinchester.id,
  canonical_id: deanWinchester.id,
});
