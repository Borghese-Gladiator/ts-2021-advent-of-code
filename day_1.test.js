const {find_num_times_increased, find_sliding_window_sum_increase} = require("./day_1");
test("Day 1 Part 1 - Expected Data", () => {
  const data = [199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,]
  expect(find_num_times_increased(data)).toBe(7);
  expect(find_sliding_window_sum_increase(data)).toBe(5);
});

test("Day 1 Part 1 - Custom Data", () => {
  const data = [
    157,
    158,
    167,
    157,
    148,
    154,
    155,
    156,
    151,
  ]
  expect(find_num_times_increased(data)).toBe(5);
  expect(find_sliding_window_sum_increase(data)).toBe(1);
})