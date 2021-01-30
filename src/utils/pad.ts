export const pad = (num: number) =>
  num.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
