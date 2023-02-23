const makeAccountNumberSecure = (number) => {
  const numberStr = String(number);
  const prefix = "***";
  const lastDigits = numberStr.substring(numberStr.length - 4);
  return { prefix, lastDigits };
};

export default makeAccountNumberSecure;
