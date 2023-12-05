import { boxPrint } from "../../../utils/boxPrint.js";
import { getInput, getLines } from "../../../utils/getInput.js";

interface Hand {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  hands: Hand[];
}

const input = await getInput(import.meta, (raw) => {
  const lines = getLines(raw);
  return lines.map((line): Game => {
    const [game, hands] = line.split(": ");
    const [, id] = game.split(" ");
    return {
      id: Number(id.trim()),
      hands: hands.split("; ").map((hand) => {
        const colorCount = hand.split(", ");
        return colorCount.reduce(
          (acc, color) => {
            const [count, colorName] = color.split(" ");
            acc[colorName as keyof typeof acc] = Number(count);
            return acc;
          },
          { red: 0, blue: 0, green: 0 },
        );
      }),
    };
  });
});

const sum = input.reduce((acc, { hands }) => {
  const gameMaxPossibleCubes = hands.reduce(
    (acc, hand) => {
      return {
        red: Math.max(acc.red, hand.red),
        green: Math.max(acc.green, hand.green),
        blue: Math.max(acc.blue, hand.blue),
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
  const gamePower =
    gameMaxPossibleCubes.red *
    gameMaxPossibleCubes.green *
    gameMaxPossibleCubes.blue;
  return acc + gamePower;
}, 0);

boxPrint(sum);
