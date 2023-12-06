import { boxPrint } from "../../../utils/boxPrint.js";
import { getInput, getLines } from "../../../utils/getInput.js";
import _ from "lodash";

type Part = number;
type Position = [row: number, col: number];

interface EnginePart {
  part: Part;
  colStart: number;
  colEnd: number;
  row: number;
}

interface Engine {
  parts: {
    [row: Position[0]]: {
      [col: Position[1]]: EnginePart;
    };
  };
  symbols: Position[];
}

const SYMBOLS = ["*"];

const input = await getInput(import.meta, (raw) => {
  const lines = getLines(raw);

  return lines.reduce<Engine>(
    (acc, line, row) => {
      // Repeat the full part number for [row, col] of each part of the number is in.
      // e.g: "...123....". Since "123" occupies columns 3, 4, and 5, the full part number is repeated in each of those columns: { 3: 123, 4: 123, 5: 123 }
      const numbers = line.match(/\d+/g);
      if (numbers) {
        acc.parts[row] = {};
        let cursor = 0;
        for (const num of numbers) {
          const colStart = line.indexOf(num, cursor);
          const colEnd = colStart + num.length;
          cursor = colEnd;
          for (let col = colStart; col < colEnd; col++) {
            acc.parts[row][col] = {
              part: Number(num),
              colStart,
              colEnd,
              row,
            };
          }
        }
      }

      // Find the position of each symbol.
      const symbolsRegex = new RegExp(
        `[${SYMBOLS.map((symbol) => `\\${symbol}`).join("")}]`,
        "g",
      );
      const symbols = line.match(symbolsRegex);
      if (symbols) {
        let cursor = 0;
        for (const symbol of symbols) {
          const col = line.indexOf(symbol, cursor);
          cursor = col + 1;
          acc.symbols.push([row, col]);
        }
      }
      return acc;
    },
    { parts: {}, symbols: [] },
  );
});

const sum = input.symbols.reduce((acc, [row, col]) => {
  const adjacent = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  let adjacentEngineParts: EnginePart[] = [];
  for (const [adjRow, adjCol] of adjacent) {
    const adjacentEnginePart = input.parts[adjRow]?.[adjCol];
    if (
      !adjacentEnginePart ||
      adjacentEngineParts.find((ep) => _.isEqual(ep, adjacentEnginePart))
    ) {
      continue;
    }
    adjacentEngineParts.push(adjacentEnginePart);
  }

  if (adjacentEngineParts.length !== 2) return acc;
  const [enginePart1, enginePart2] = adjacentEngineParts;
  const gearRatio = enginePart1.part * enginePart2.part;
  for (const adjacentEnginePart of adjacentEngineParts) {
    for (
      let col = adjacentEnginePart.colStart;
      col < adjacentEnginePart.colEnd;
      col++
    ) {
      delete input.parts[adjacentEnginePart.row][col];
    }
  }

  return acc + gearRatio;
}, 0);

boxPrint(sum);
