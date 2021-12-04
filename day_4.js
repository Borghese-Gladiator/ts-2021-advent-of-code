const { Console } = require('console');
const fs = require('fs')
const logger = require('npmlog');
logger.level = 'warn'
const day_4_input = fs.readFileSync('./data/day_4_input.txt', { encoding: 'utf8', flag: 'r' });
const line_by_line_day_4_input = day_4_input.split('\r\n')

// CONVERT TXT FILE INPUT TO numbers_drawn, bingo_boards
let numbers_drawn = []
let bingo_boards = []
let temp_board = []

for (let i = 0; i < line_by_line_day_4_input.length; i++) {
  const line_input = line_by_line_day_4_input[i].trim()
  // logger.info(`${i} - ${line_input}`)
  if (i === 0) {
    numbers_drawn = line_input.split(",").map(val => parseInt(val, 10))
    i++ // jump to line 3
    continue
  }
  // check for space between bingo boards
  if (line_input.length === 0) {
    bingo_boards.push(temp_board)
    temp_board = []
    continue
  }
  if (i === line_by_line_day_4_input.length - 1) {
    // last line of input does not have empty line afterwards
    temp_board.push(line_input.split(/\s+/).map(val => parseInt(val, 10))) // splits on multiple spaces
    bingo_boards.push(temp_board)
    temp_board = []
  }
  temp_board.push(line_input.split(/\s+/).map(val => parseInt(val, 10))) // splits on multiple spaces
}
logger.info("Info Prefix", numbers_drawn)
logger.info("Info Prefix", bingo_boards)

// PART 1
logger.warn(`RESULT1: ${find_first_winning_board_final_score(numbers_drawn, bingo_boards)}`);
// PART 2
logger.warn(`RESULT2: ${find_last_winning_board_final_score(numbers_drawn, bingo_boards)}`);


function find_first_winning_board_final_score(drawn_numbers, bingo_boards) {
  const marked_constant = -1;
  /*
  // Initialize winning_arr - cannot use fill since that creates a reference ({ drawn_num_idx: -1, drawn_num: -1 })
  const ARRAY_SIZE = bingo_boards.length
  let winning_arr = new Array(ARRAY_SIZE);
  for (let i = 0, winning_arr = []; i < ARRAY_SIZE; winning_arr[i++] = { drawn_num_idx: -1, drawn_num: -1 });
  */
  const ARRAY_SIZE = bingo_boards.length
  const winning_arr = new Array(ARRAY_SIZE).fill().map(u => { return { drawn_num_idx: -1, drawn_num: -1 } });
  for (let drawn_num_idx = 0; drawn_num_idx < drawn_numbers.length; drawn_num_idx++) {
    const drawn_num = drawn_numbers[drawn_num_idx]
    bingo_boards = bingo_boards.map((bingo_board, board_idx) => {
      // if board has already won, keep it
      if (winning_arr[board_idx].drawn_num_idx !== -1) {
        return bingo_board
      }

      // mark values given drawn number
      const new_board = bingo_board.map(bingo_row =>
        bingo_row.map(num => num === drawn_num ? marked_constant : num)
      );

      // check VERTICALS and HORIZONTAL for bingo
      for (let i = 0; i < new_board.length; i++) {
        const row = new_board[i]
        const col = new_board.map(row => row[i])
        const row_bingo = row.every(v => v === marked_constant)
        const col_bingo = col.every(v => v === marked_constant)
        if (row_bingo || col_bingo) {
          winning_arr[board_idx].drawn_num_idx = drawn_num_idx
          winning_arr[board_idx].drawn_num = drawn_num
        }
      }
      return new_board;
    })
  }
  logger.info("Winning Arr", winning_arr)
  const first_winning_idx = Math.min(...winning_arr.map(val => val.drawn_num_idx))
  for (let i = 0; i < winning_arr.length; i++) {
    logger.info("Compare first_winning_idx & drawn_num_idx", first_winning_idx, winning_arr[i].drawn_num_idx, first_winning_idx === winning_arr[i].drawn_num_idx )
    if (first_winning_idx === winning_arr[i].drawn_num_idx) {
      logger.info("MADE IT HERE")
      const winning_board = bingo_boards[i]
      logger.info("Winning BoardASFASDFS", winning_board)
      const board_remaining_sum = winning_board
        .reduce((a, b) => a.concat(b)) // flatten array
        .filter((val) => val !== marked_constant) // filter out marked values
        .reduce((a, b) => a + b, 0); // sum array
      logger.info("Winning Number Idx", winning_arr[i].drawn_num_idx)
      logger.info("Winning Number", winning_arr[i].drawn_num)
      logger.info("Winning Board Sum", board_remaining_sum)
      return winning_arr[i].drawn_num * board_remaining_sum
    }
  }
}

function find_last_winning_board_final_score(drawn_numbers, bingo_boards) {
  const marked_constant = -1;
  /*
  // Initialize winning_arr - cannot use fill since that creates a reference ({ drawn_num_idx: -1, drawn_num: -1 })
  const ARRAY_SIZE = bingo_boards.length
  let winning_arr = new Array(ARRAY_SIZE);
  for (let i = 0, winning_arr = []; i < ARRAY_SIZE; winning_arr[i++] = { drawn_num_idx: -1, drawn_num: -1 });
  */
  const ARRAY_SIZE = bingo_boards.length
  const winning_arr = new Array(ARRAY_SIZE).fill().map(u => { return { drawn_num_idx: -1, drawn_num: -1 } });
  for (let drawn_num_idx = 0; drawn_num_idx < drawn_numbers.length; drawn_num_idx++) {
    const drawn_num = drawn_numbers[drawn_num_idx]
    bingo_boards = bingo_boards.map((bingo_board, board_idx) => {
      // if board has already won, keep it
      if (winning_arr[board_idx].drawn_num_idx !== -1) {
        return bingo_board
      }

      // mark values given drawn number
      const new_board = bingo_board.map(bingo_row =>
        bingo_row.map(num => num === drawn_num ? marked_constant : num)
      );

      // check VERTICALS and HORIZONTAL for bingo
      for (let i = 0; i < new_board.length; i++) {
        const row = new_board[i]
        const col = new_board.map(row => row[i])
        const row_bingo = row.every(v => v === marked_constant)
        const col_bingo = col.every(v => v === marked_constant)
        if (row_bingo || col_bingo) {
          winning_arr[board_idx].drawn_num_idx = drawn_num_idx
          winning_arr[board_idx].drawn_num = drawn_num
        }
      }
      return new_board;
    })
  }
  logger.info("Winning Arr", winning_arr)
  const last_winnind_idx = Math.max(...winning_arr.map(val => val.drawn_num_idx))
  for (let i = 0; i < winning_arr.length; i++) {
    logger.info("Compare first_winning_idx & drawn_num_idx", last_winnind_idx, winning_arr[i].drawn_num_idx, last_winnind_idx === winning_arr[i].drawn_num_idx )
    if (last_winnind_idx === winning_arr[i].drawn_num_idx) {
      logger.info("MADE IT HERE")
      const winning_board = bingo_boards[i]
      logger.info("Winning BoardASFASDFS", winning_board)
      const board_remaining_sum = winning_board
        .reduce((a, b) => a.concat(b)) // flatten array
        .filter((val) => val !== marked_constant) // filter out marked values
        .reduce((a, b) => a + b, 0); // sum array
      logger.info("Winning Number Idx", winning_arr[i].drawn_num_idx)
      logger.info("Winning Number", winning_arr[i].drawn_num)
      logger.info("Winning Board Sum", board_remaining_sum)
      return winning_arr[i].drawn_num * board_remaining_sum
    }
  }
}
/*
HOLDS ARRAY OF WINNING SCORES and finds biggest rather than just use the first score
  const winning_score_arr = []
  for (let i = 0; i < winning_arr.length; i++) {
    if (winning_arr[i].drawn_num_idx === first_winning_idx) {
      const winning_board = bingo_boards[i]
      logger.info("Winning Board", winning_board)
      const board_remaining_sum = winning_board
        .reduce((a, b) => a.concat(b)) // flatten array
        .filter((val) => val !== marked_constant) // filter out marked values
        .reduce((a, b) => a + b, 0); // sum array
      logger.info("Winning Number Idx", winning_arr[i].drawn_num_idx)
      logger.info("Winning Number", winning_arr[i].drawn_num)
      logger.info("Winning Board Sum", board_remaining_sum)
      winning_score_arr.push(winning_arr[i].drawn_num * board_remaining_sum)
    }
  }
  const winning_score = Math.max(...winning_score_arr);
  return winning_score
*/
/*
Good Utility to find min of array
// const a = Math.min(...bingo_boards_winning_num_idx)
*/
/*
**I FORGOT TO ACCOUNT FOR COLUMNS** => therefore works with unit tests, but fails actual results
function find_winning_board_final_score(numbers_drawn, bingo_boards) {
  let bingo_hit = false
  let winning_number_drawn = 0
  let board_bingo_idx = 0
  for (let i = 0; i < numbers_drawn.length; i++) {
    bingo_boards = bingo_boards.map((bingo_board, board_idx) => {
      return bingo_board.map(bingo_row => {
        const row = bingo_row.filter(bingo_num => bingo_num !== numbers_drawn[i])
        if (row.length === 0) {
          bingo_hit = true
          winning_number_drawn = numbers_drawn[i]
          board_bingo_idx = board_idx
        }
        return row
      })
    })
    if (bingo_hit) {
      break;
    }
  }
  const board_remaining_sum = bingo_boards[board_bingo_idx]
    .reduce((a,b) => a.concat(b) ) // flatten array
    .reduce((a,b) => a + b ); // sum array
  logger.info("Winning Number", winning_number_drawn)
  logger.info("Winning Board Sum", board_remaining_sum)
  return winning_number_drawn * board_remaining_sum;
}
*/

module.exports = {
  find_first_winning_board_final_score,
  find_last_winning_board_final_score
}