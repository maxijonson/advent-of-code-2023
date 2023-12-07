import { boxPrint } from "../../../utils/boxPrint.js";
import { getInput, getLines } from "../../../utils/getInput.js";

interface Card {
  id: number;
  winning: number[];
  player: number[];
  score: number;
}

const input = await getInput(import.meta, (raw) => {
  const lines = getLines(raw);
  return lines.map((line, i): Card => {
    const card: Card = {
      id: i + 1,
      winning: [],
      player: [],
      score: 0,
    };
    const [, nums] = line.split(":");
    const [winning, player] = nums.split(" | ");
    card.winning = winning.trim().split(" ").map(Number).filter(Boolean);
    card.player = player.trim().split(" ").map(Number).filter(Boolean);

    card.score = card.winning.reduce((score, num) => {
      const index = card.player.indexOf(num);
      if (index === -1) return score;
      return score ? score * 2 : 1;
    }, 0);

    return card;
  });
});

const score = input.reduce((acc, card) => acc + card.score, 0);
boxPrint(score);
