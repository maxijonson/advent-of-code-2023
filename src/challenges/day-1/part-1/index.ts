import { getInput, getLines } from "../../../utils/getInput.js";
import { boxPrint } from "../../../utils/boxPrint.js";

const input = await getInput(import.meta, getLines);

const sum = input
  .map((line) => line.replaceAll(/[a-z]/g, ""))
  .map((line) => {
    const str = `${line.at(0)}${line.at(-1)}`;
    return parseInt(str);
  })
  .reduce((a, b) => a + b, 0);

boxPrint(sum);
