export function priceWithSpace(number, divide = true) {
  const bigPrice = divide ? number / 100 : number;
  const bigPriceString = bigPrice?.toString();

  if (bigPriceString?.length < 3) {
    return bigPriceString;
  }
  return bigPriceString?.slice(0, -3) + " " + bigPriceString?.slice(-3);
}

export function priceWithSpaceForAdmin(value) {
  const num = Number(value);
  if (isNaN(num)) return "";

  // Ha az abszolút érték kisebb, mint 10000, ne formázza
  if (Math.abs(num) < 10000) {
    return num.toString();
  }

  // Szétválasztjuk az egész és a tizedes részt
  const parts = num.toString().split(".");
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : null;

  // Kezeljük a negatív számokat: különválasztjuk az előjelet
  let sign = "";
  if (integerPart.startsWith("-")) {
    sign = "-";
    integerPart = integerPart.slice(1);
  }

  // Az egész részt csoportosítjuk ezres csoportokra szóközzel
  const grouped = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const resultInteger = sign + grouped;

  return decimalPart ? `${resultInteger}.${decimalPart}` : resultInteger;
}
