import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { boxPrint } from "./boxPrint.js";

export const getInput = async <
  T extends (input: string) => any = (input: string) => string,
  R = ReturnType<T>,
>(
  meta: ImportMeta,
  transform?: T,
): Promise<R> => {
  const __filename = fileURLToPath(meta.url);
  const __dirname = path.dirname(__filename);

  const input = path.join(__dirname, "..", "input.txt");
  const content = await fs.readFile(input, "utf-8");
  return transform?.(content) ?? content;
};

export const getLines = (input: string) =>
  input
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const getLinesSample =
  (sample: number, offset = 0) =>
  (input: string) => {
    const lines = getLines(input).slice(offset, offset + sample);
    boxPrint(lines, "Sample");
    return lines;
  };

export const getBlocks = (input: string) =>
  input
    .split("\n\n")
    .map((l) => l.trim())
    .filter(Boolean);
