from statistics import mode

def open_file(file_name):

def total_calories_per_day(day):
    sum = 0
    #calories = all entries with matching day
    for i in calories:
        sum += i
    return sum

def total_calories_per_week(startDate):
    sum = 0
    day = 1
    while(day <= 7):
        newDate = startDate + day
        dayCal = total_calories_per_day(newDate)
        sum += i
    return sum

def most_eaten_food(food_list):
    return statistics.mode(food_list)

def close_file(file_name):