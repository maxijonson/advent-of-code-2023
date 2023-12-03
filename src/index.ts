import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHALLENGE_DIR = path.join(__dirname, "challenges");

const lastDay = fs
  .readdirSync(CHALLENGE_DIR)
  .filter((file) => file.startsWith("day-"))
  .map((file) => parseInt(file.replace("day-", "")))
  .sort((a, b) => b - a)[0];

const program = new Command();

program
  .option("-d, --day <day>", "Day of the challenge")
  .option("-p, --part <part>", "Part of the challenge")
  .action(async (opts) => {
    const options = z
      .object({
        day: z.coerce.number().min(1).max(25).optional(),
        part: z.coerce.number().min(1).max(2).optional(),
      })
      .parse(opts);
    const day = options.day ?? lastDay;
    const part =
      options.part ??
      fs
        .readdirSync(path.join(CHALLENGE_DIR, `day-${day}`))
        .filter((file) => file.startsWith("part-"))
        .map((file) => parseInt(file.replace("part-", "")))
        .sort((a, b) => b - a)[0];

    await import(`./challenges/day-${day}/part-${part}/index.ts`);
  })
  .parse();
