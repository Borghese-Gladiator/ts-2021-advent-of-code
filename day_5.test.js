const { find_num_points_overlap, find_diagonal } = require("./day_5");
const fs = require('fs')

test("Day 5 - Expected Data", () => {
  const data = []
  const day_5_input = fs.readFileSync('./data/day_5_unit_test_input.txt', { encoding: 'utf8', flag: 'r' });
  const line_by_line_input = day_5_input.split('\r\n')
  for (const line of line_by_line_input) {
    const [from_str, to_str] = line.split('->');
    const [from_x, from_y] = from_str.trim().split(",");
    const [to_x, to_y] = to_str.trim().split(",");
    data.push({
      from: {
        x: parseInt(from_x, 10),
        y: parseInt(from_y, 10)
      },
      to: {
        x: parseInt(to_x, 10),
        y: parseInt(to_y, 10)
      }
    })
  }
  expect(find_num_points_overlap(data)).toBe(5)
  expect(find_diagonal(data, true)).toBe(12);
});