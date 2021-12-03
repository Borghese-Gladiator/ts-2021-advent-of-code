const { find_horizontal_vertical_positions, find_depth_with_aim } = require("./day_2");
test("Day 2 - Expected Data", () => {
  const data = [
    ["forward", 5],
    ["down", 5],
    ["forward", 8],
    ["up", 3],
    ["down", 8],
    ["forward", 2],
  ]
  expect(find_horizontal_vertical_positions(data)).toBe(150);
  expect(find_depth_with_aim(data)).toBe(900)
});
