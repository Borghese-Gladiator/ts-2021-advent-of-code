# 2021 Advent of Code
December coding challenge that I'm doing with friends
- Run file - ```node day_1.js```
- Run tests - ```npx jest```

## Notes
- Day 1 to 5 - used Node 12.22.7
- Day 6 to 10 - used Python 3.8.10 and numpy 1.21.4

#### JavaScript
- Libraries - Jest & npmlog
- Remember that fill uses object references, when you fill with an object and it's updated, all the values get changed
- Always remember to change STRING inputs into numbers with parseInt
- npmlog sucks with Jest unit tests - all the log prefixes get messed with

#### Python
- Libraries - default ones of unittest & loggin
- NOTE - setting a value equal to a parameter changes the value (passed by reference)
```
initial_fish_list = []
forecast_population(80, initial_fish_list)
forecast_population2(160, initial_fish_list)

def forecast_population(num_days, initial_fish_list):
  timer_list = initial_fish_list
  for day in num_days:
    timer_list += 1

## initial_fish_list gets changed by forecast_population
```