/**
 * Syncs GROQ query definitions from packages/sanity to sanity/src for TypeGen.
 * packages/sanity is the source of truth.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const packagesPath = path.join(__dirname, "..", "..", "packages", "sanity", "src", "queries.ts")
const sanityPath = path.join(__dirname, "..", "src", "queries.ts")

const content = fs.readFileSync(packagesPath, "utf-8")
const constStart = content.indexOf("const eventsQuery = groq`")
const constEnd = content.indexOf("\nexport async function")

if (constStart === -1 || constEnd === -1) {
  throw new Error("Could not parse packages/sanity/src/queries.ts")
}

const queryBlock = content.slice(constStart, constEnd).trim()
const exportBlock = `export {
  eventsQuery,
  eventBySlugQuery,
  mediaQuery,
  mediaBySlugQuery,
  resourcesQuery,
  resourceBySlugQuery,
  studioSpacesQuery,
  equipmentQuery,
}`
const header = `/**
 * GROQ query definitions for TypeGen (synced from packages/sanity).
 * Do not edit - run 'yarn typegen' which syncs from packages/sanity first.
 */
import groq from "groq"

`

fs.writeFileSync(sanityPath, header + queryBlock + "\n\n" + exportBlock + "\n")
console.log("Synced queries from packages/sanity to sanity/src/queries.ts")
