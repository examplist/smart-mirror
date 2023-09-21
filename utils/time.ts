export function writeTimeToString(dateObj: Date) {
  dateObj.setHours(dateObj.getHours() + 9);
  return dateObj.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function readTimeToString(dateObj: Date) {
  return dateObj.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
