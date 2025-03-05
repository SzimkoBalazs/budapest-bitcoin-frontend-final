export function getTicketPrice(ticket, locale) {
  if (locale && locale.toLowerCase() === 'hu') {
    return ticket.priceInHuf;
  } else {
    return ticket.priceInEur;
  }
}
