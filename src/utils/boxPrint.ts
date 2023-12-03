import chalk from "chalk";

export const boxPrint = (value: any, title = "Answer") => {
  const valueString = JSON.stringify(value, null, 2);
  const valueLines = valueString.split("\n");
  const maxLineLength = valueLines.reduce(
    (max, line) => Math.max(max, line.length),
    title.length + 2,
  );

  const box = [
    chalk.white.bold("┌" + "─".repeat(maxLineLength + 2) + "┐"),
    chalk.white.bold(
      "│ " +
        chalk.white.bold(`${title}: `.padEnd(maxLineLength, " ")) +
        chalk.white.bold(" │"),
    ),
    ...valueLines.map(
      (line) =>
        chalk.white.bold("│ ") +
        chalk.greenBright(line.padEnd(maxLineLength, " ")) +
        chalk.white.bold(" │"),
    ),
    chalk.white.bold("└" + "─".repeat(maxLineLength + 2) + "┘"),
  ].join("\n");

  console.info(box);
};
