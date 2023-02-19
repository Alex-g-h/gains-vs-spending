const makeAccountNumberSecure = (number) => {
  const numberStr = String(number);
  const secureNumber = "***" + numberStr.substring(numberStr.length - 4);
  return secureNumber;
};

export default makeAccountNumberSecure;
