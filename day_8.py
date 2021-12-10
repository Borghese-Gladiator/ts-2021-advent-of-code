import numpy as np
from itertools import islice
import unittest
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Part 1
def count_unique_digits(signal_input):
    num = 0
    for signal in signal_input:
        logger.info(f"Signal - {signal}")
        signal_pattern_list, output_list = signal
        for output in output_list:
            if 0 < find_digit(output):
                num += 1
    return num

def find_digit(signal_pattern):
    if len(signal_pattern) == 2:
        return 1
    elif len(signal_pattern) == 3:
        return 7
    elif len(signal_pattern) == 4:
        return 4
    elif len(signal_pattern) == 7:
        return 8
    else:
        return 0

class TestValues(unittest.TestCase):
    def test_expected(self):
        input_list = load_input_from_file('data/day_8_unit_test_input.txt')
        logger.critical(f"0:3 - {input_list[0:3]}")
        self.assertEqual(count_unique_digits(input_list), 26)

def load_input_from_file(file_name):
    result = []
    with open(file_name, 'r') as f:
        for line in f:
            line = line.rstrip()
            signal_pattern, four_digit_output = line.split("|", 1)
            signal_pattern_list = signal_pattern.strip().split(" ")
            four_digit_output_list = four_digit_output.strip().split(" ")
            result.append((signal_pattern_list, four_digit_output_list))
    return result

if __name__ == '__main__':
    signal_input = load_input_from_file('data/day_8_input.txt')
    logger.critical(f"0:3 - {signal_input[0:3]}")
    result = count_unique_digits(signal_input)
    logger.critical(f"PART 1: {result}")
    # result2 = calc_expo_fuel_to_align(signal_input)
    # logger.critical(f"PART 2: {result2}")
    
    # python -m unittest test_add_fish_to_aquarium.py
    # unittest.main()
