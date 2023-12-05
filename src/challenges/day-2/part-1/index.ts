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

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

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

const possibleGames = input.filter((game) => {
  return game.hands.every((hand) => {
    return (
      hand.red <= MAX_RED && hand.green <= MAX_GREEN && hand.blue <= MAX_BLUE
    );
  });
});

const sum = possibleGames.reduce((acc, game) => {
  return acc + game.id;
}, 0);

boxPrint(sum);
