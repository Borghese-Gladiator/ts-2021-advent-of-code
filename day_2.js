const fs = require('fs');
const logger = require('npmlog');
logger.level = 'warn'
const day_2_input = fs.readFileSync('./data/day_2_input.txt', { encoding: 'utf8', flag: 'r' });
const arr_day_2_input = day_2_input.split('\r\n')
let split_arr_day_2_input = []
for (const line of arr_day_2_input) {
  split_arr_day_2_input.push(line.split(' '));
}
// PART 1
logger.warn(`RESULT1: ${find_horizontal_vertical_positions(split_arr_day_2_input)}`);
// PART 2
logger.warn(`RESULT2: ${find_depth_with_aim(split_arr_day_2_input)}`);


/**
 * 
 * @param {*} array_of_arrays 
 * @returns 
 */
function find_horizontal_vertical_positions(array_of_arrays) {
  // PART 1
  const result = {
    horizontal: 0,
    vertical: 0
  }
  for (const blah of array_of_arrays) {
    const direction = blah[0]
    const value = parseInt(blah[1], 10)
    switch (direction) {
      case 'forward':
        result.horizontal += value
        break;
      case 'up':
        result.vertical -= value // depth decreasing
        break;
      case 'down':
        result.vertical += value // depth increasing
        break;
    }
  }
  logger.info(JSON.stringify(result))
  return result.horizontal * result.vertical
}

function find_depth_with_aim(array_of_arrays) {
  // PART 2
  const result = {
    horizontal: 0,
    depth: 0,
    aim: 0
  }
  for (const blah of array_of_arrays) {
    const direction = blah[0]
    const value = parseInt(blah[1], 10)
    logger.info(`AIM: ${result.aim} - ${direction} ${value}`)
    switch (direction) {
      case 'forward':
        result.horizontal += value
        result.depth += result.aim * value
        break;
      case 'up':
        result.aim -= value
        break;
      case 'down':
        result.aim += value
        break;
    }
  }
  logger.info(JSON.stringify(result))
  return result.horizontal * result.depth
}

module.exports = {
  find_horizontal_vertical_positions,
  find_depth_with_aim
}