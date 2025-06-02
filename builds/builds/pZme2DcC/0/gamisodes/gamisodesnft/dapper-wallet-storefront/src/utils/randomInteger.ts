export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return ~~rand;
}