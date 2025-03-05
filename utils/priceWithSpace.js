export function priceWithSpace(number, divide = true) {
  const bigPrice = divide ? number / 100 : number;
  const bigPriceString = bigPrice?.toString();

  if (bigPriceString?.length < 3) {
    return bigPriceString;
  }
  return bigPriceString?.slice(0, -3) + ' ' + bigPriceString?.slice(-3);
}
