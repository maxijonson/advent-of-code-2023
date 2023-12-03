import { getInput, linesTransformer } from "../../../utils/getInput.js";
import { boxPrint } from "../../../utils/boxPrint.js";

const input = await getInput(import.meta, linesTransformer);

const NUMS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;
type NumKey = keyof typeof NUMS;

const sum = input
  .map((line) => {
    const nums = [
      ...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))/g),
    ].reduce((acc, match) => {
      acc.push(match[1]);
      return acc;
    }, [] as string[]);

    if (!nums.length) return line;
    if (nums.length === 1) {
      return line.replace(nums[0], NUMS[nums[0] as NumKey].toString());
    }

    const firstNum = nums.at(0) as NumKey;
    const lastNum = nums.at(-1) as NumKey;
    const firstNumIndex = line.indexOf(firstNum);
    const lastNumIndex = line.lastIndexOf(lastNum);

    return [
      line.slice(0, firstNumIndex),
      NUMS[firstNum].toString(),
      line.slice(firstNumIndex + 1, lastNumIndex),
      NUMS[lastNum].toString(),
      line.slice(lastNumIndex + 1),
    ].join("");
  })
  .map((line) => line.replaceAll(/[a-z]/g, ""))
  .map((line) => {
    const str = `${line.at(0)}${line.at(-1)}`;
    return parseInt(str);
  })
  .reduce((a, b) => a + b, 0);

boxPrint(sum);
