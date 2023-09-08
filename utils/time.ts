export function toMySQLDatetime(dateObj) {
  dateObj.setHours(dateObj.getHours() + 9);
  return dateObj.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
