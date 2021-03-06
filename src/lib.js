const faker = require("faker");

const callWithPrev = (prev, fn) => [fn.call(null, prev)];

const compose = (...fns) => (...args) => fns.reduceRight(callWithPrev, args);

const randomBoolean = () => JSON.parse(faker.random.boolean());

const randomInt = () => Math.floor(Math.random() * 100);

const createObservation = () => ({
  country: faker.address.country(),
  sex: randomBoolean() ? "M" : "F",
  hasVirus: randomBoolean(),
  age: randomInt(),
  isMarried: randomBoolean(),
});

const arrayOfLength = (n) => new Array(n).fill(null);

function generateDataCollection(n) {
  const collection = arrayOfLength(n);
  return collection.map(createObservation);
}

module.exports = {
  generateDataCollection,
  compose,
};
