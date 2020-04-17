const colors = require("colors");
const { generateDataCollection } = require("./lib");

const data = generateDataCollection(500);

const isMarried = (o) => Boolean(o.isMarried);
const hasVirus = (o) => Boolean(o.hasVirus);

console.log();
console.group("Calculate how many people is married and infected".bold);
const married = data.filter(isMarried);
const marriedAndInfected = married.filter(hasVirus);
console.log(
  "Number of married and infected people: ".bold.gray,
  marriedAndInfected.length
);
console.log();
console.groupEnd();

const calculatePercentage = (n, total) => (n * 100) / total;

console.log();
console.group("Calculate the percentage of married and infected people".bold);
const percentageOfInfected = married.reduce(
  (state, o, _, _married) => {
    const infected = hasVirus(o) ? state.infected + 1 : state.infected;
    return {
      infected,
      percentage: calculatePercentage(infected, _married.length),
      total: _married.length,
    };
  },
  { infected: 0, percentage: 0 }
);
console.log(
  "The percentage of married people that is infected: ".bold.grey,
  `${percentageOfInfected.percentage}%`
);
console.log();
console.groupEnd();

const createPairsFromObject = (map) =>
  Object.keys(map).map((key) => [key, map[key]]);

console.log();
console.group("Calculate totals by country".bold);
const dataByCountry = data.reduce((byCountry, o) => {
  const countryTotal = byCountry[o.country] || 0;
  return {
    ...byCountry,
    [o.country]: countryTotal === 0 ? 1 : countryTotal + 1,
  };
}, {});
const countryData = createPairsFromObject(dataByCountry);
const higherThan5 = countryData.filter((o) => o[1] > 5);
console.log("Data by country (with more than 5 cases): ".bold.grey);
higherThan5.forEach((higher) => console.log(higher));
console.log();
console.groupEnd();
