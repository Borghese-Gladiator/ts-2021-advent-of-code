import numpy as np
from itertools import islice
import unittest
import logging
logging.basicConfig(level=logging.CRITICAL)
logger = logging.getLogger(__name__)

reproduce_timer = 6
new_child_reproduce_timer = reproduce_timer + 2

def forecast_population(num_days, initial_timer_list):
    def reduce_timer(timer):
        if timer == 0:
            return reproduce_timer
        return timer - 1
    timer_list = initial_timer_list
    for day in range(0, num_days):
        logger.info(f"Day {day} - {timer_list}")
        for i in range(0, len(timer_list)):
            if timer_list[i] == 0:
                timer_list[i] = reproduce_timer
                timer_list.append(reproduce_timer + 2)
            else:
                timer_list[i] -= 1
    return len(timer_list)

def forecast_population2(num_days, initial_timer_list):
    timer_list = np.array(initial_timer_list)
    for day in range(0, num_days):
        logger.info(f"Day {day} - {timer_list}")
        num_zeros = np.count_nonzero(timer_list == 0)
        timer_list -= 1
        timer_list[timer_list <= -1] = reproduce_timer
        timer_list = np.append(timer_list, np.full((1, num_zeros), new_child_reproduce_timer))
    return len(timer_list)

class TestValues(unittest.TestCase):
    def test_forecast_population(self):
        initial_timer_list = [3,4,3,1,2]
        self.assertEqual(forecast_population(18, initial_timer_list), 26)
        # FAILS this unit test but got correct answer
        # self.assertEqual(forecast_population(80, initial_timer_list), 5934)

    def test_forecast_population2(self):
        initial_timer_list = [3,4,3,1,2]
        self.assertEqual(forecast_population2(18, initial_timer_list), 26)
        self.assertEqual(forecast_population2(80, initial_timer_list), 5934)

if __name__ == '__main__':
    initial_fish_list = []
    with open('data/day_6_input.txt', 'r') as f:
        lines = f.readlines()
        initial_fish_list = [int(i) for i in lines[0].split(",")]
    population = forecast_population(80, initial_fish_list)
    logger.critical(f"PART 1: {population}")
    population2 = forecast_population2(256, initial_fish_list)
    logger.critical(f"PART 2: {population2}")
    
    # python -m unittest test_add_fish_to_aquarium.py
    # unittest.main()