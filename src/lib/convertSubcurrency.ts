function convertSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
export default convertSubcurrency;
