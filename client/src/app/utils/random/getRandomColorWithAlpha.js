import fitAlphaChannel from "./fitAlphaChannel";
import { getRandomInt } from "./getRandomInt";

/**
 * Generate random color with fixed alpha level
 * @param {*} alpha Transparency level of random color
 * @returns Random color with transparency level
 */
export function getRandomColorWithAlpha(alpha) {
  fitAlphaChannel(alpha);

  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
