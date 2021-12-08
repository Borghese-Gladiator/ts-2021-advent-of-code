import numpy as np
from itertools import islice
import unittest
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def calc_fuel_to_align(crab_pos_list):
    pos_arr = np.array(crab_pos_list)
    possible_final_positions_arr = np.unique(pos_arr, return_index=False)
    result = []
    logger.info(f"Unique Values - {possible_final_positions_arr}")
    for possible_final_position in possible_final_positions_arr:
        fuel_to_move = np.absolute(pos_arr - possible_final_position).sum()
        result.append(fuel_to_move)
    logger.info(f"Fuel Results - {result}")
    return min(result)


def calc_expo_fuel_to_align(crab_pos_list):
    '''
    Made an error - it can be ANY final position, I thought it would be one of the numbers from the array
    Argument unpacking operator ===> [*range(0, np.amax(pos_arr))]
    https://www.geeksforgeeks.org/range-to-a-list-in-python/
    '''
    # each move costs 1 more than the last - first step costs 1; second step costs 2
    # 1 step - 1
    # 2 step - 3 (1 + 2)
    # 3 step - 6 (1 + 2 + 3)
    # 4 step - 10 (1 + 2 + 3 + 4)
    # 5 step - 15 (1 + 2 + 3 + 4 + 5)
    # SUMMATION sum of integers formula - n * (n + 1) // 2
    pos_arr = np.array(crab_pos_list)
    possible_final_positions_arr = [*range(0, np.amax(pos_arr))]
    result = []
    logger.info(f"Unique Values - {possible_final_positions_arr}")
    for possible_final_position in possible_final_positions_arr:
        distance_arr = np.absolute(pos_arr - possible_final_position)
        fuel_to_move = np.floor_divide(distance_arr * (distance_arr + 1), 2).sum()
        result.append(fuel_to_move)
    logger.info(f"Fuel Results - {result}")
    return min(result)

class TestValues(unittest.TestCase):
    def test_expected(self):
        initial_list = [16,1,2,0,4,2,7,1,2,14]
        self.assertEqual(calc_fuel_to_align(initial_list), 37)
        self.assertEqual(calc_expo_fuel_to_align([1, 4, 5]), 7)
        self.assertEqual(calc_expo_fuel_to_align(initial_list), 168)


if __name__ == '__main__':
    initial_fish_list = []
    with open('data/day_7_input.txt', 'r') as f:
        lines = f.readlines()
        initial_list = [int(i) for i in lines[0].split(",")]
    min_fuel = calc_fuel_to_align(initial_list)
    logger.critical(f"PART 1: {min_fuel}")
    min_fuel2 = calc_expo_fuel_to_align(initial_list)
    logger.critical(f"PART 2: {min_fuel2}")
    
    # python -m unittest test_add_fish_to_aquarium.py
    # unittest.main()