export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// answer by aloisdg
// https://stackoverflow.com/questions/58764552/validate-page-ranges-for-printing-regular-expression
// i modified it to my need, added totalPages limit
// and few more check cases
export function validatePageRanges(input, totalPages) {
  const isNumeric = (input) => !isNaN(input); // you may also check if the value is a nonzero positive integer
  const isOrdered = (start, end) => parseInt(start) < parseInt(end);
  const isRangeValid = (range) =>
    range.length === 2 &&
    range.every((item) => isNumeric(item)) &&
    isOrdered(range[0], range[1]);
  const isSingleValid = (single) => single.length === 1 && isNumeric(single);

  const inputs = input.split("-").map((x) => x.trim());

  if (inputs.length > 2) return false;
  if (inputs.length < 1) return false;
  if (inputs[1] > totalPages) return false;

  for (var x of inputs) {
    if (!x) return false;
    if (!isSingleValid(inputs) && !isRangeValid(inputs)) return false;
  }

  return true;
}
