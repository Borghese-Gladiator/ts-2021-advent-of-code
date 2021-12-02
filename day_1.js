
const fs = require('fs');
const logger = require('npmlog');
logger.level = 'warn'
const depths_string = fs.readFileSync('./day_1_input.txt', {encoding:'utf8', flag:'r'});
const depth_list = depths_string.split('\r\n');

// PART 1
logger.warn(`RESULT1: ${find_num_times_increased(depth_list)}`);

// answer was 1292
// => i get 1291 for some reason
// logger.info(arr)


// PART 2
logger.warn(`RESULT2: ${find_sliding_window_sum_increase(depth_list)}`);

function find_num_times_increased(arr) {
  const number_arr = arr.map(function (x) { 
    return parseInt(x, 10); 
  });
  // PART 1
  let result = 0
  for (let i = 0; i < number_arr.length - 1; i++) {
    // logger.info(`COMPARED: ${arr[i]} ${arr[i + 1]}`)
    if (number_arr[i] < number_arr[i + 1]) {
      result += 1
      // logger.info(`INCREMENTED TO ${result}`)
    }
  }
  return result
}

function find_sliding_window_sum_increase(arr) {
  const number_arr = arr.map(function (x) { 
    return parseInt(x, 10); 
  });
  // PART 2
  const window_size = 3
  const last_window = number_arr.length - window_size;
  let result = 0
  for (let i = 0; i < last_window; i++) {
    const prev_subarr = number_arr.slice(i, i + window_size)
    const curr_subarr = number_arr.slice(i + 1, i + 1 + window_size)
    logger.info(`PREV ARR: ${prev_subarr}`)
    logger.info(`ARR: ${curr_subarr}`)
    
    const prev_sum = prev_subarr.reduce((a, b) => a + b, 0)
    const curr_sum = curr_subarr.reduce((a, b) => a + b, 0)
    logger.info(`COMPARED: ${prev_sum} ${curr_sum}`)
    if (prev_sum < curr_sum) {
      result += 1
      logger.info(`INCREMENTED TO ${result}`)
    }
  }
  return result
}

module.exports = {
  find_num_times_increased,
  find_sliding_window_sum_increase
}