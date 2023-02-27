import fitAlphaChannel from "./fitAlphaChannel.js";
import { getRandomInt } from "./getRandomInt.js";

/**
 * Generate random background and border colors with fixed alpha levels
 * @param {*} alphaBg Transparency level of random color for background
 * @param {*} alphaBorder Transparency level of random color for border
 * @returns Array of two colors [background, border]
 */
export function getRandomBgBorderColorAlpha(alphaBg = 0.2, alphaBorder = 1.0) {
  fitAlphaChannel(alphaBg);
  fitAlphaChannel(alphaBorder);

  const r = getRandomInt(0, 255);
  const g = getRandomInt(0, 255);
  const b = getRandomInt(0, 255);

  const colorBg = `rgba(${r}, ${g}, ${b}, ${alphaBg})`;
  const colorBorder = `rgba(${r}, ${g}, ${b}, ${alphaBorder})`;

  return [colorBg, colorBorder];
}
