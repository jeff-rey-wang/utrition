from statistics import mode
from csv import reader, writer
from datetime import datetime
import os

def log_data(food_data):
	timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
	csv_row = [timestamp, food_data["food_name"], food_data["serving_qty"], food_data["calories"], food_data["total_fat"], food_data["saturated_fat"], food_data["cholesterol"], food_data["sodium"], food_data["total_carbohydrate"], food_data["dietary_fiber"], food_data["sugars"], food_data["protein"]]

	if os.path.isfile("./nutrition_log.csv"):
		with open("./nutrition_log.csv", 'a') as csvfile:
			filewriter = writer(csvfile, delimiter=',')
			filewriter.writerow(csv_row)
	else:
		with open("./nutrition_log.csv", 'w') as csvfile:
			filewriter = writer(csvfile, delimiter=',')
			filewriter.writerow(["Time", "Name", "Serving Quantity", "Calories", "Total Fat", "Saturated Fat", "Cholesterol", "Sodium", "Total Carbohydrate", "Dietary Fiber", "Sugars", "Protein"])
			filewriter.writerow(csv_row)

def read_file():
    existing_data = []

    with open("./nutrition_log.csv", 'r') as csvfile:
        filereader = reader(csvfile, delimiter=',')
        for row in filereader:
            existing_data.append(row)
        existing_data = sorted(existing_data, key=lambda row: row[0], reverse=True)

    return existing_data

def find_entry(number):
    data = read_file()
    return data[number]

def total_calories_per_day(day=datetime.now().strftime("%d/%m/%Y")):
    sum = 0
    data = read_file()

    for entry in data:
        if day in entry[0]:
            sum += float(entry[3])
    
    return sum

def total_foods_per_day(day=datetime.now().strftime("%d/%m/%Y")):
    foods = 0
    data = read_file()

    for entry in data:
        if day in entry[0]:
            foods.append(entry[1])
    
    return foods

def total_calories_per_week(dates):
    sum = 0

    for day in dates:
        sum += total_calories_per_day(day)
    return sum

def most_eaten_food():
    foods = []
    data = read_file()

    for entry in data:
        foods.append(entry[1])

    return mode(foods)