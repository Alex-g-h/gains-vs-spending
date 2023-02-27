/**
 * Fit alpha channel value to [0, 1] in float values
 * @param {*} alpha Alpha channel value
 * @returns Number value between 0.0 and 1.0
 */
function fitAlphaChannel(alpha) {
  if (Number.isNaN(alpha)) alpha = 0;

  // fit alpha to appropriate values
  if (alpha < 0) alpha = 0;
  if (alpha > 1) alpha = 1;

  return alpha;
}

export default fitAlphaChannel;
