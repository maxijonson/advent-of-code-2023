import { boxPrint } from "../../../utils/boxPrint.js";
import { getInput, getLines } from "../../../utils/getInput.js";

interface Card {
  id: number;
  winning: number[];
  player: number[];
  matches: number;
  copies: number;
}

const input = await getInput(import.meta, (raw) => {
  const lines = getLines(raw);
  return lines.map((line, i): Card => {
    const card: Card = {
      id: i + 1,
      winning: [],
      player: [],
      matches: 0,
      copies: 0,
    };
    const [, nums] = line.split(":");
    const [winning, player] = nums.split(" | ");
    card.winning = winning.trim().split(" ").map(Number).filter(Boolean);
    card.player = player.trim().split(" ").map(Number).filter(Boolean);

    card.matches = card.winning.reduce((matches, num) => {
      const index = card.player.indexOf(num);
      if (index === -1) return matches;
      return matches + 1;
    }, 0);

    return card;
  });
});

for (const [i, card] of input.entries()) {
  for (let j = 0; j < card.copies + 1; j++) {
    const copies = input.slice(i + 1, i + 1 + card.matches);

    for (const copy of copies) {
      copy.copies += 1;
    }
  }
}

const total = input.reduce((acc, card) => acc + card.copies + 1, 0);
boxPrint(total);
