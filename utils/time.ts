export function timeToString(dateObj: Date) {
  dateObj.setHours(dateObj.getHours() + 9);
  return dateObj.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
