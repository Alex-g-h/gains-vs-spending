/**
 * Generate random integer number in range [min, max] include min and
 * max boundaries
 * @param {*} min Minimum value
 * @param {*} max Maximum value
 * @returns Random integer number in range [min, max]
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
