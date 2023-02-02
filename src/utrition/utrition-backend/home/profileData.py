from statistics import mode
from csv import reader, writer
import datetime
import os

def log_data(food_data):
    timestamp = datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    for entry in food_data:
        csv_row = [timestamp, entry["food_name"], entry["serving_qty"], entry["serving_unit"], entry["serving_weight_grams"], entry["calories"], entry["total_fat"], entry["saturated_fat"], entry["cholesterol"], entry["sodium"], entry["total_carbohydrate"], entry["dietary_fiber"], entry["sugars"], entry["protein"], entry["potassium"]]
        csv_row = [0 if x is None else x for x in csv_row]

        if os.path.isfile("./nutrition_log.csv"):
            with open("./nutrition_log.csv", 'a') as csvfile:
                filewriter = writer(csvfile, delimiter=',')
                filewriter.writerow(csv_row)
        else:
            with open("./nutrition_log.csv", 'w') as csvfile:
                filewriter = writer(csvfile, delimiter=',')
                filewriter.writerow(["Time", "Name", "Serving Quantity", "Serving Unit", "Serving Weight in Grams", "Calories", "Total Fat", "Saturated Fat", "Cholesterol", "Sodium", "Total Carbohydrate", "Dietary Fiber", "Sugars", "Protein", "Potassium"])
                filewriter.writerow(csv_row)

def calculateTotalNutrients(food_data):
    food_name = []
    calories = 0
    total_fat = 0
    saturated_fat = 0
    cholesterol = 0
    sodium = 0
    total_carbohydrate = 0
    dietary_fiber = 0
    sugars = 0
    protein = 0
    potassium = 0

    for entry in food_data:
        row = [entry["food_name"], entry["calories"], entry["total_fat"], entry["saturated_fat"], entry["cholesterol"], entry["sodium"], entry["total_carbohydrate"], entry["dietary_fiber"], entry["sugars"], entry["protein"], entry["potassium"]]
        row = [0 if x is None else x for x in row]

        food_name.append(row[0] + ", ")
        calories += float(row[1])
        total_fat += float(row[2])
        saturated_fat += float(row[3])
        cholesterol += float(row[4])
        sodium += float(row[5])
        total_carbohydrate += float(row[6])
        dietary_fiber += float(row[7])
        sugars += float(row[8])
        protein += float(row[9])
        potassium += float(row[10])

    food_name[-1] = food_name[-1][:-2]

    totalNutrients = {
        "food_name": food_name,
        "calories": round(calories, 2),
        "total_fat": round(total_fat, 2),
        "saturated_fat": round(saturated_fat, 2),
        "cholesterol": round(cholesterol, 2),
        "sodium": round(sodium, 2),
        "total_carbohydrate": round(total_carbohydrate, 2),
        "dietary_fiber": round(dietary_fiber, 2),
        "sugars": round(sugars, 2),
        "protein": round(protein, 2),
        "potassium": round(potassium, 2),
    }

    return totalNutrients

def read_file():
    existing_data = []

    with open("./nutrition_log.csv", 'r') as csvfile:
        filereader = reader(csvfile, delimiter=',')
        for row in filereader:
            existing_data.append(row)

        existing_data = existing_data[1:]
        existing_data = sorted(existing_data, key=lambda row: datetime.datetime.strptime(row[0], '%d/%m/%Y %H:%M:%S'), reverse=True)

    return existing_data

def read_file_as_json():
    dataInList = read_file()
    dataAsJson = []
    for entry in dataInList:
        datetimeObject = datetime.datetime.strptime(entry[0], '%d/%m/%Y %H:%M:%S')
        dateFormatted = datetimeObject.strftime("%b %d")
        food_data = {
            "timestamp": dateFormatted,
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

def total_calories_per_day(day=datetime.datetime.now().strftime("%d/%m/%Y")):
    sum = 0
    data = read_file()

    for entry in data:
        if day in entry[0]:
            sum += float(entry[5])
    
    sum = round(sum, 2)
    return sum

def total_foods_per_day(day=datetime.datetime.now().strftime("%d/%m/%Y")):
    foods = []
    data = read_file()

    for entry in data:
        if day in entry[0]:
            foodStr = entry[1] + ", "
            foods.append(foodStr)
    foods[-1] = foods[-1][:-2]
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

            datetimeObject = datetime.datetime.strptime(day, '%d/%m/%Y')
            dateFormatted = datetimeObject.strftime("%b %d")

            newEntry = {
                "date": dateFormatted,
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

    return mode(foods)