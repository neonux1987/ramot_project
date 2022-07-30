// filter expanses codes array with default
// expanses codes array
export function filterExpansesCodes(defaultExpansesCodes, expansesCodes) {
  // create an array of expanses codes key value pairs
  // and store it in a map
  const keyValuePairsArr = defaultExpansesCodes.map((item) => {
    return [item.code, item.codeName];
  });
  let map = new Map(keyValuePairsArr);

  const filteredExpansesCodes = expansesCodes.filter(
    (item) => !map.has(item.code)
  );
  return filteredExpansesCodes;
}

export const sort = (objectA, objectB) => {
  if (objectA.codeName < objectB.codeName) {
    return -1;
  }
  if (objectA.codeName > objectB.codeName) {
    return 1;
  }
  // a must be equal to b
  return 0;
};
