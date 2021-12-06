const fs = require('fs')
const logger = require('npmlog');
logger.level = 'warn'

// CONVERT TEXT FILE TO vents_arr
const vents_arr = []
const day_5_input = fs.readFileSync('./data/day_5_input.txt', { encoding: 'utf8', flag: 'r' });
const line_by_line_input = day_5_input.split('\r\n')
for (const line of line_by_line_input) {
  const [from_str, to_str] = line.split('->');
  const [from_x, from_y] = from_str.trim().split(",");
  const [to_x, to_y] = to_str.trim().split(",");
  vents_arr.push({
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
logger.info("VENTS ARR", vents_arr);

// PART 1
// logger.warn(`RESULT1: ${find_num_points_overlap(vents_arr)}`);
// PART 2
logger.warn(`RESULT2: ${find_diagonal(vents_arr)}`);

/**
 * @param include_diagonal - Includes diagonals in count
 */
function find_num_points_overlap(line_arr, include_diagonal=false) {
  // Find highest line X and Y values
  const height = Math.max(...line_arr.map(line => line.from.y).concat(line_arr.map(line => line.to.y))) + 1
  const width = Math.max(...line_arr.map(line => line.from.x).concat(line_arr.map(line => line.to.x))) + 1
  // Initialize Grid
  // [
  // Y1: [X1, X2],
  // Y2: [X1, X2]
  // ]
  // access w/ arr[Y1][X2]

  let grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width).fill(0);
  }
  logger.info("WIDTH & HEIGHT", width, height)
  for (const line of line_arr) {
    grid = draw_line(grid, line, include_diagonal)
  }
  display_board(grid)
  // logger.info("POST GRID", grid)
  const num_intersections = grid.reduce((a, b) => a.concat(b), []).filter(val => val >= 2).length
  return num_intersections;
}

function find_diagonal(line_arr) {
  // Find highest line X and Y values
  const height = Math.max(...line_arr.map(line => line.from.y).concat(line_arr.map(line => line.to.y))) + 1
  const width = Math.max(...line_arr.map(line => line.from.x).concat(line_arr.map(line => line.to.x))) + 1
  let grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width).fill(0);
  }
  for (const line of line_arr) {
    grid = draw_line_2(grid, line)
  }
  display_board(grid)
  const num_intersections = grid.reduce((a, b) => a.concat(b), []).filter(val => val >= 2).length
  return num_intersections;

}

function draw_line(grid, line, include_diagonal=false) {
  const { from, to } = line;
  if (from.x === to.x) { // vertical
    const max = Math.max(from.y, to.y)
    const min = Math.min(from.y, to.y)
    logger.info("Looping Y from min to max", min, max)
    for (let i = min; i <= max; i++) {
      // logger.info("GRID",grid[i][from.x], from.x, i)
      grid[i][from.x] += 1;
    }
  } else if (from.y === to.y) { // horizontal
    const max = Math.max(from.x, to.x)
    const min = Math.min(from.x, to.x)
    logger.info("Looping X from min to max", min, max)
    for (let i = min; i <= max; i++) {
      // logger.info("GRID", grid[from.y][i], i, from.y)
      grid[from.y][i] += 1;
    }
  } else { // diagonal 45 degrees
    // DIAGONAL DOES NOT WORK
    if (include_diagonal) {
      if ((from.x + to.x) % (from.y + to.y) === 0) {
        logger.info("Looping diagonal for points: ", from, to)
        const x_sign = from.x < to.x ? 1 : -1
        const y_sign = from.y < to.y ? 1 : -1
        for (let x = from.x, y = from.y; x !== to.x + x_sign; x += x_sign, y += y_sign) {
          logger.warn("GRID", grid[y][x], x, y)
          grid[y][x] += 1;
        }
      }
      // [0,0]++
      // [1,1]++
      // [2,2]++

      // [0,8]++
      // [1,7]++
      // [2,6]++
    }
  }
  return grid
}

function draw_line_2(grid, line) {
  const { from, to } = line;
  const x_sign = from.x === to.x ? 0 : from.x < to.x ? 1 : -1
  const y_sign = from.y === to.y ? 0 : from.y < to.y ? 1 : -1
  let x = from.x
  let y = from.y
  do {
    logger.info("", grid[y][x], x, y)
    grid[y][x] += 1
    if (x === to.x && y === to.y) {
      break;
    }
    x += x_sign;
    y += y_sign;
  } while(true);
  return grid
}

function display_board(board) {
  for (let i = 0; i < board.length; i++) {
    logger.info(board[i].join(""));
  }
}

module.exports = {
  find_num_points_overlap,
  find_diagonal
}