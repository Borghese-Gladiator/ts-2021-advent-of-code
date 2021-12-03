const { find_power_consumption, find_life_support_rating } = require("./day_3");
test("Day 3 - Expected Data", () => {
  const data = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ]
  expect(find_power_consumption(data)).toBe(198);
  expect(find_life_support_rating(data)).toBe(230);
});
