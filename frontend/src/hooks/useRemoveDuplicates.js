export const removeDuplicates = (arr, prop1, prop2) => {
  const result = [];
  const seen = new Set();

  for (const obj in arr) {
    const key = obj[prop1] + obj[prop2];

    if (!seen.has(key)) {
      seen.add(key);
      result.push(obj);
    }
  }

  return result;
};
