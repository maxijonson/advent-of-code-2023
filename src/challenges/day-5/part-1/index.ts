import { boxPrint } from "../../../utils/boxPrint.js";
import { getBlocks, getInput } from "../../../utils/getInput.js";

interface Map {
  destRangeStart: number;
  srcRangeStart: number;
  rangeLength: number;
}

const parseMap = (input: string) => {
  const [, ...map] = input.split("\n");
  return map.map((row): Map => {
    const [destRangeStart, srcRangeStart, rangeLength] = row
      .split(" ")
      .map(Number);
    return {
      destRangeStart,
      srcRangeStart,
      rangeLength,
    };
  });
};

const getMapForValue = (value: number, maps: Map[]) => {
  return maps.find(({ srcRangeStart, rangeLength }) => {
    const srcRangeEnd = srcRangeStart + rangeLength - 1;
    return value >= srcRangeStart && value <= srcRangeEnd;
  });
};

const getDestinsationValue = (sourceValue: number, maps: Map[]) => {
  const map = getMapForValue(sourceValue, maps);
  if (!map) return sourceValue;
  return map.destRangeStart + (sourceValue - map.srcRangeStart);
};

const input = await getInput(import.meta, (raw) => {
  const blocks = getBlocks(raw);
  const [
    inputSeeds,
    inputSeedToSoil,
    inputSoitToFertilizer,
    inputFertilizerToWater,
    inputWaterToLight,
    inputLightToTermperature,
    inputTemperatureToHumidity,
    inputHumidityToLocation,
  ] = blocks;

  const seeds = inputSeeds
    .split("seeds:")[1]
    .trim()
    .split(" ")
    .map(Number)
    .filter(Boolean);

  const [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = [
    inputSeedToSoil,
    inputSoitToFertilizer,
    inputFertilizerToWater,
    inputWaterToLight,
    inputLightToTermperature,
    inputTemperatureToHumidity,
    inputHumidityToLocation,
  ].map(parseMap);

  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  };
});

const {
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
} = input;

const locations = seeds.map((seed) => {
  const soil = getDestinsationValue(seed, seedToSoil);
  const fertilizer = getDestinsationValue(soil, soilToFertilizer);
  const water = getDestinsationValue(fertilizer, fertilizerToWater);
  const light = getDestinsationValue(water, waterToLight);
  const temperature = getDestinsationValue(light, lightToTemperature);
  const humidity = getDestinsationValue(temperature, temperatureToHumidity);
  const location = getDestinsationValue(humidity, humidityToLocation);
  return location;
});

const lowestLocation = Math.min(...locations);

boxPrint(lowestLocation);
