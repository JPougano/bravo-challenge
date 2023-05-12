/**
 * Receives a rate list and splits it into smallers rates
 * @rateList rates object
 * @returns {array}
 */

const splitRates = (rateList) => {
  const arrayOfRates = [];
  for (const key in rateList) {
    arrayOfRates.push({ currency: key, rate: rateList[key] });
  }

  return arrayOfRates;
};

module.exports = {
  splitRates,
};
