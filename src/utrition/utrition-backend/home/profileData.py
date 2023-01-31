from statistics import mode
from csv import reader, writer
from datetime import datetime
import os

def log_data(food_data):
    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    for entry in food_data:
        csv_row = [timestamp, entry["food_name"], entry["serving_qty"], entry["serving_unit"], entry["serving_weight_grams"], entry["calories"], entry["total_fat"], entry["saturated_fat"], entry["cholesterol"], entry["sodium"], entry["total_carbohydrate"], entry["dietary_fiber"], entry["sugars"], entry["protein"], entry["potassium"]]

        if os.path.isfile("./nutrition_log.csv"):
            with open("./nutrition_log.csv", 'a') as csvfile:
                filewriter = writer(csvfile, delimiter=',')
                filewriter.writerow(csv_row)
        else:
            with open("./nutrition_log.csv", 'w') as csvfile:
                filewriter = writer(csvfile, delimiter=',')
                filewriter.writerow(["Time", "Name", "Serving Quantity", "Serving Unit", "Serving Weight in Grams", "Calories", "Total Fat", "Saturated Fat", "Cholesterol", "Sodium", "Total Carbohydrate", "Dietary Fiber", "Sugars", "Protein", "Potassium"])
                filewriter.writerow(csv_row)

def read_file():
    existing_data = []

    with open("./nutrition_log.csv", 'r') as csvfile:
        filereader = reader(csvfile, delimiter=',')
        for row in filereader:
            existing_data.append(row)
        existing_data = sorted(existing_data, key=lambda row: row[0], reverse=True)

    return existing_data[1:]

def read_file_as_json():
    dataInList = read_file()
    dataAsJson = []
    for entry in dataInList:
        food_data = {
            "timestamp": entry[0],
            "food_name": entry[1],
            "serving_qty": entry[2],
            "serving_unit": entry[3],
            "serving_weight_grams": entry[4],
            "calories": entry[5],
            "total_fat": entry[6],
            "saturated_fat": entry[7],
            "cholesterol": entry[8],
            "sodium": entry[9],
            "total_carbohydrate": entry[10],
            "dietary_fiber": entry[11],
            "sugars": entry[12],
            "protein": entry[13],
            "potassium": entry[14],
        }
        dataAsJson.append(food_data)
    return dataAsJson

def find_entry(number):
    data = read_file()
    return data[number-1]

def total_calories_per_day(day=datetime.now().strftime("%d/%m/%Y")):
    sum = 0
    data = read_file()

    for entry in data:
        if day in entry[0]:
            sum += float(entry[5])
    
    return sum

def total_foods_per_day(day=datetime.now().strftime("%d/%m/%Y")):
    foods = []
    data = read_file()

    for entry in data:
        if day in entry[0]:
            foods.append(entry[1])
    
    return foods

def total_calories_per_day_summary_list():
    foodData = []
    sumPerDay = 0
    foodsPerDay = []

    data = read_file()
    day = ""

    for entry in data:
        if day != entry[0][:10]:
            day = entry[0][:10]

            sumPerDay = total_calories_per_day(day)
            foodsPerDay = total_foods_per_day(day)

            newEntry = {
                "date": day,
                "sumPerDay": sumPerDay,
                "foodsPerDay": foodsPerDay,
            }

            foodData.append(newEntry)
    return foodData

def most_eaten_food():
    foods = []
    data = read_file()

    for entry in data:
        foods.append(entry[1])

    mostCommon = {
        "mode": mode(foods)
    }
    return mostCommon