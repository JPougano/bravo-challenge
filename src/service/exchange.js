/**
 * This calculates the final conversion of currency
 * @rateList Array of rates
 * @from Origin of conversion
 * @to Conversion destination
 * @amount Qty of money to be converted
 * @returns {Number}
 */
const convertCurrency = (rateList, { from, to, amount }) => {
  if (rateList.length < 2) {
    const fromData = rateList.filter((cur) => cur.currency === from);
    const toData = rateList.filter((cur) => cur.currency === to);

    let error;
    if (fromData.length === 0) {
      error = `Please, check if '${from}' exists`;
    }
    if (toData.length === 0) {
      error = `Please, check if '${to}' exists`;
    }
    if (fromData.length === 0 && toData.length === 0) {
      error = `Please, check if both '${from}' and '${to}' exists`;
    }

    throw new Error(error);
  }

  const numericRegex = /^(\$)?(\d{1,3}(,\d{3})*|(\d+))(\.\d{1,2})?$/;
  if (!numericRegex.test(amount)) {
    throw new Error("Amount must have only numeric characters");
  }

  const fromData = rateList.filter((cur) => cur.currency === from);
  const toData = rateList.filter((cur) => cur.currency === to);

  if (fromData.length === 0 || toData.length === 0) {
    throw new Error(`Check if both 'from' and 'to' exists`);
  }

  const fromRate = parseFloat(fromData[0].rate);
  const toRate = parseFloat(toData[0].rate);

  const backingConversion = parseFloat(amount / fromRate);
  const backedTo = parseFloat(backingConversion * toRate);

  return backedTo;
};

module.exports = { convertCurrency };
