export const getProgressValue = (val: number) =>
  Math.min((val / 255) * 100, 100);
