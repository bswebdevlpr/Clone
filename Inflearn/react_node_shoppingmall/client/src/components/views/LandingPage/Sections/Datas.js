const continents = [
  {
    _id: 1,
    name: "Twice",
  },
  {
    _id: 2,
    name: "Japan",
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$1 to $99",
    array: [1, 99],
  },
  {
    _id: 2,
    name: "More than $100",
    array: [100, Infinity],
  },
];

export { continents, price };
