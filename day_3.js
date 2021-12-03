const fs = require('fs')
const logger = require('npmlog');
logger.level = 'warn'
const day_3_input = fs.readFileSync('./data/day_3_input.txt', { encoding: 'utf8', flag: 'r' });
const arr_day_3_input = day_3_input.split('\r\n')

// PART 1
logger.warn(`RESULT1: ${find_power_consumption(arr_day_3_input)}`);
// PART 2
logger.warn(`RESULT2: ${find_life_support_rating(arr_day_3_input)}`);

// PART 1
function find_power_consumption(binary_arr) {
  // @param binary_arr - stored binarys as strings since they get convertd to integers otherwise
  // @precondition - binary_arr[0] is same length as other binary numbers
  const columns_arr = []
  for (let i = 0; i < binary_arr[0].length; i++) {
    columns_arr.push(binary_arr.map(val => val[i]))
  }
  logger.info(columns_arr)
  logger.info(columns_arr.map(val => most_frequent(val)).join(""))
  logger.info(columns_arr.map(val => least_frequent(val)).join(""))
  const gamma_rate = parseInt(
    columns_arr.map(val => most_frequent(val)).join(""),
    2
  )
  const epsilon_rate = parseInt(
    columns_arr.map(val => least_frequent(val)).join(""),
    2
  )
  logger.info(`Gamma Rate: ${gamma_rate} AND Epsilon Rate: ${epsilon_rate}`)
  return gamma_rate * epsilon_rate
}

// PART 2
function find_life_support_rating(binary_arr) {
  // Find oxygen rating
  let most_common_binary_arr_copy = [...binary_arr]
  for (let i = 0; i < binary_arr[0].length; i++) {
    const col = most_common_binary_arr_copy.map(val => val[i])
    const one_count = col.filter(val => val === "1").length
    const zero_count = col.filter(val => val === "0").length
    let most_freq_val;
    if (one_count >= zero_count) {
      most_freq_val = "1"
    } else {
      most_freq_val = "0"
    }
    most_common_binary_arr_copy = most_common_binary_arr_copy.filter(val => val[i] === most_freq_val)
    if (most_common_binary_arr_copy.length === 1) {
      break;
    }
  }
  logger.info(most_common_binary_arr_copy)
  const oxygen_rating = parseInt(most_common_binary_arr_copy[0], 2);

  // Find co2 rating
  let least_common_binary_arr_copy = [...binary_arr]
  for (let i = 0; i < binary_arr[0].length; i++) {
    const col = least_common_binary_arr_copy.map(val => val[i])
    const one_count = col.filter(val => val === "1").length
    const zero_count = col.filter(val => val === "0").length
    let least_freq_val;
    if (zero_count <= one_count) {
      least_freq_val = "0"
    } else {
      least_freq_val = "1"
    }
    least_common_binary_arr_copy = least_common_binary_arr_copy.filter(val => val[i] === least_freq_val)
    if (least_common_binary_arr_copy.length === 1) {
      break;
    }
  }
  logger.info(least_common_binary_arr_copy)
  const co2_rating = parseInt(least_common_binary_arr_copy[0], 2)
  
  // calculate life support rating
  logger.info(`Oxygen: ${oxygen_rating} AND CO2: ${co2_rating}`)
  return oxygen_rating * co2_rating
}

function most_frequent(array) {
  if (array.length == 0)
    return null;
  const modeMap = {};
  let maxEl = array[0], maxCount = 1;
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    if (modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

function least_frequent(array) {
  const result = [...array.reduce((r, n) => // create a map of occurrences
    r.set(n, (r.get(n) || 0) + 1), new Map()
  )]
  .reduce((r, v) => v[1] < r[1] ? v : r)[0]; // get the the item that appear less times
  return result;
}

module.exports = {
  find_power_consumption,
  find_life_support_rating
}